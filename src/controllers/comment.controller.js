import mongoose, { isValidObjectId } from "mongoose"
import {Comment} from "../models/comment.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getVideoComments = asyncHandler(async (req, res) => {
    //TODO: get all comments for a video
    const {videoId} = req.params
    const {page = 1, limit = 10} = req.query

})

const addComment = asyncHandler(async (req, res) => {
    // add a comment to a video
    const commentContent = req.body
    if(!commentContent){
        throw new ApiError(400, "commentContent not found")
    }

    const userId = req.user?._id;
    if(!userId){
        throw new ApiError(400, "user not found - addComment")
    }

    const videoId = req.params;
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
    const commentId = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "commentId is not found - updateComment")
    }

    const updatedContent = req.body
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

//TODO: comment delete ho chuka hai, but dekh lena iska reference kahi aur use to nhi ho rha hai
const deleteComment = asyncHandler(async (req, res) => {
    // delete a comment
    const commentId = req.params
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