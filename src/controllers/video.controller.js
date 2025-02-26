import mongoose, {isValidObjectId} from "mongoose"
import {Video} from "../models/video.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"
import {uploadOnCloudinary} from "../utils/cloudinary.service.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination
    
})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    // TODO: get video, upload to cloudinary, create video

    if(
        [title, description].some((field) => {
            field?.trim() === ""
        })
    ){
        throw new ApiError(400, "Both title and description required for publishing video")
    }

    // get video and thumbnail local path
    const videoLocalPath = req.files?.videoFile[0]?.path
    if(!videoLocalPath){
        throw new ApiError(400, "video file is required *missing")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if(!thumbnailLocalPath){
        throw new ApiError(400, "video file is required *missing")
    }

    //upload video and file on cloudinary
    const videoFile = await uploadOnCloudinary(videoLocalPath)
    if(!videoFile){
        throw new ApiError(400, "videoFile file not uploaded")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if(!thumbnail){
        throw new ApiError(400, "thumbnail file not uploaded")
    }
    
    // get user from req.user (verifyJWT middleware append it)
    const userId = req.user?._id

    // create video model
    const video = await Video.create(
        {
            videoFile: videoFile.url, // cloudinary
            thumbnail: thumbnail.url, // cloudinary
            title,
            description,
            duration: videoFile.duration,
            owner: userId
        }
    )

    //********** check for video creation/publish **********//
    if (!video) {
        throw new ApiError(500, "something went wrong while publishing video")
    }

    return res.status(201).json(
        new ApiResponse(200, video, "video published successfully")
    )
})

const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: get video by id
})

const updateVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: update video details like title, description, thumbnail

})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //TODO: delete video
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideo,
    deleteVideo,
    togglePublishStatus
}