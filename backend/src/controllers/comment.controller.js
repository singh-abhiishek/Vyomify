import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { Comment } from "../models/comment.model.js"
import { ApiError } from "../utils/ApiError.js/"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - getVideoComments")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getVideoComments")
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(500, `video does not exist, id:- ${videoId} - getVideoComments`);
    }

    // console.log("from get video comments", video)

    const pipeline = [
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "userDetails",
                pipeline: [
                    {
                        $project: {
                            _id: 0,
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        },
                    },
                ],
            }
        },
        {
            $addFields: {
                userDetails: {
                    $first: "$userDetails"
                }
            }
        },
        {
            $sort: { createdAt: -1 }
        }
    ];

    // pagination  
    const { page = 1, limit = 10 } = req.query
    const options = {
        page,
        limit,
        pagination: true,
    };

    const response = await Comment.aggregatePaginate(pipeline, options);
    // console.log("from  pagination getcomments", response)

    if (!response) {
        throw new ApiError(401, "Error occur in pagination response - getVideoComments")
    }
    // console.log("from get video comments", response)

    return res.status(200).json(
        new ApiResponse(200, response, "video comments fetched successfully")
    )

    // above response will look like this
    // { 
    //     "docs": [ ...comments... ],
    //     "totalDocs": 30,
    //     "limit": 10,
    //     "page": 1,
    //     "totalPages": 3,
    //     "hasNextPage": true,
    //     "hasPrevPage": false,    
    //     "nextPage": 2,
    //     "prevPage": null
    // }

})

const addComment = asyncHandler(async (req, res) => {
    // add a comment to a video
    const { comment } = req.body
    // console.log("from addcoment", req.body)
    if (!comment) {
        throw new ApiError(400, "comment not found - addComment")
    }

    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "user not found - addComment")
    }

    // console.log(req.params)
    const { videoId } = req.params;
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is not found - addComment")
    }

    const createdComment = await Comment.create({
        content: comment,
        video: videoId,
        owner: userId
    })

    if (!createdComment) {
        throw new ApiError(500, "something went wrong while - addComment")
    }

    return res.status(200).json(
        new ApiResponse(200, createdComment, "comment added successfully")
    )
})

const updateComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    // console.log("here at back update comment", commentId)

    if (!commentId) {
        throw new ApiError(400, "commentId is missing - updateComment")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid commentId - updateComment")
    }

    const { updatedContent } = req.body
    // console.log("here at back update comment", updatedContent)


    if (!updatedContent) {
        throw new ApiError(400, "updatedContent is missing - updateComment")
    }

    const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        {
            $set: {
                content: updatedContent
            }
        },
        { new: true }
    )

    if (!updatedComment) {
        throw new ApiError(400, "updatedComment is not found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedComment, "comment updated successfully"))
})

const deleteComment = asyncHandler(async (req, res) => {
    // delete a comment
    const { commentId } = req.params
    // console.log("hii from backend delete comment", commentId)
    if (!commentId) {
        throw new ApiError(400, "commentId is not found - updateComment")
    }
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid commentId- updateComment")
    }

    const response = await Comment.findByIdAndDelete(commentId)
    if (!response) {
        throw new ApiError(400, "error while deleting comment")
    }

    return res.status(200).json(
        new ApiResponse(200, "comment deleted Successfully")
    )
})

export {
    getVideoComments,
    addComment,
    updateComment,
    deleteComment
}