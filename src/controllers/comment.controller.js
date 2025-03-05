import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //get all comments for a video
    const {videoId} = req.params
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getVideoComments")
    }
    const {page = 1, limit = 10} = req.query

    const pageNumber = parseInt(page)
    const pageSize = parseInt(limit)
    const skip = (pageNumber - 1) * pageSize

    // const comments = await Comment.find(
    //     {
    //         video: new mongoose.Types.ObjectId(videoId)
    //     }
    // )
    // .limit(pageSize)
    // .skip(skip)

    // const commentsCount = await Comment.countDocuments(
    //     {
    //         video: new mongoose.Types.ObjectId(videoId)
    //     }
    // )

    //$facet allows you to run multiple queries in parallel within a single aggregation pipeline. Instead of making separate calls for documents and count, you can fetch both at once!

    const response = await Comment.aggregate([
        {
            $match: {
                video: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $facet: {
                countComment: [
                    { $count: "count"} // "count" is a variable, can be any thing 
                ],
                comments: [
                   { $skip: skip },
                   { $limit: limit }
                ]
            }
        }
    ])
    const noOfComments = response[0].countComment[0]?.count
    const totalComments = response[0].comments

    return res.status(200).json(
        new ApiResponse(200, { noOfComments, totalComments }, "video comments fetched successfully")
    )
})

const addComment = asyncHandler(async (req, res) => {
    // add a comment to a video
    const { commentContent } = req.body
    if(!commentContent){
        throw new ApiError(400, "commentContent not found")
    }

    const userId = req.user?._id;
    if(!userId){
        throw new ApiError(400, "user not found - addComment")
    }

    console.log(req.params)
    const { videoId } = req.params;
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "videoId is not found - addComment")
    }

    const comment = await Comment.create({
        content: commentContent,
        video: videoId,
        Owner: userId
    })

    if (!comment) {
        throw new ApiError(500, "something went wrong while - addComment")
    }

    return res.status(200).json(
        new ApiResponse(200, comment, "comment added successfully")
    )  
})

const updateComment = asyncHandler(async (req, res) => {
    // update a comment
    const {commentId} = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not found - updateComment")
    }

    const {updatedContent} = req.body
    if (!updatedContent) {
        throw new ApiError(400, "updatedContent is not found - updateComment")
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

//DEBUG: comment delete ho chuka hai, but dekh lena iska reference kahi aur use to nhi ho rha hai
const deleteComment = asyncHandler(async (req, res) => {
    // delete a comment
    const {commentId} = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not found - updateComment")
    }

    const response = await Comment.findByIdAndDelete(commentId)
    if(!response){
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