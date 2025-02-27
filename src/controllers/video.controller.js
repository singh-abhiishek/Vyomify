import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.service.js"


const getAllVideos = asyncHandler(async (req, res) => {
    const { page = 1, limit = 10, query, sortBy, sortType, userId } = req.query
    //TODO: get all videos based on query, sort, pagination

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description } = req.body
    //get video, upload to cloudinary, create video

    if (
        [title, description].some((field) => {
            field?.trim() === ""
        })
    ) {
        throw new ApiError(400, "Both title and description required for publishing video")
    }

    // get video and thumbnail local path
    const videoLocalPath = req.files?.videoFile[0]?.path
    if (!videoLocalPath) {
        throw new ApiError(400, "video file is required *missing")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if (!thumbnailLocalPath) {
        throw new ApiError(400, "video file is required *missing")
    }

    //upload video and file on cloudinary
    const videoFile = await uploadOnCloudinary(videoLocalPath)
    if (!videoFile) {
        throw new ApiError(400, "videoFile file not uploaded")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if (!thumbnail) {
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

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is not found while getting videoByid")
    }

    const video = await Video.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(videoId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "owner",
                pipeline: [
                    {
                        $project: {
                            fullName: 1,
                            avatar: 1,
                            coverImage: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: {
                    $first: "$owner"
                }
            }
        }
    ])

    return res
        .status(200)
        .json(
            new ApiResponse(200, video, "video gets successfully")
        )

})

const updateVideoDetails = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    //update video details like title, description
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is inValid while updating video")
    }

    const { title, description } = req.body
    if (!title || !description) {
        throw new ApiError(400, "All fields are required - updateVideoDetails")
    }

   const updatedVideo = await Video.findByIdAndUpdate(
        videoId,
        {
            $set: {
                title,
                description
            }
        }, 
        { new: true }
    )
    
    return res
    .status(200)
    .json(new ApiResponse(200, updatedVideo, "video details updated successfully"))
})

const updateVideoThumbnail = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "videoId is inValid while updating video")
    }

    const newThumbnailLocalPath = req.file?.path
    if (!newThumbnailLocalPath) {
        throw new ApiError(400, "newThumbnailLocalPath is missing while updating thumbnail")
    }
 
    const newThumbnail = await uploadOnCloudinary(newThumbnailLocalPath)
    if (!newThumbnail.url) {
        throw new ApiError(400, "newThumbnail url is missing while updating thumbnail")
    }
    
    const video = await Video.findById(videoId)
    if (!video) {
        throw new ApiError(400, "video not found while updating thumbnail")
    }

    const oldThumbnailUrl = video?.thumbnail
    if (!oldThumbnailUrl) {
        throw new ApiError(400, "oldThumbnailUrl not found")
    }
    const oldThumbnailPublicId = oldThumbnailUrl?.split("/upload/")[1].split("/")[1].split(".")[0]
    await deleteFromCloudinary(oldThumbnailPublicId)

    video.thumbnail = newThumbnail?.url
    const updatedVideo = await video.save({ validateBeforeSave: false })

    return res
    .status(200)
    .json(
        new ApiResponse(200, updatedVideo, "video thumbnail updated successfully")
    )
})

const deleteVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "videoId is inValid while updating video")
    }

    const video = await Video.findById(videoId)
    const videoFileUrl = video.videoFile
    const thumbnailUrl = video.thumbnail

    const deletedVideoFileRes = await deleteFromCloudinary(videoFileUrl)
    const deletedThumbnailRes = await deleteFromCloudinary(thumbnailUrl)

    if(!deletedVideoFileRes || !deletedThumbnailRes){
        throw new ApiError(400, "error while deleting video documents from cloudinary")
    }
    
    const deletedVideo = await Video.findByIdAndDelete(videoId)
    if(!deletedVideo){
        throw new ApiError(400, "error while deleting video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "video deleted Successfully")
    )
})

const togglePublishStatus = asyncHandler(async (req, res) => {
    const { videoId } = req.params
    if(!isValidObjectId(videoId)){
        throw new ApiError(400, "inValid videoId- togglePublishStatus")
    }

    const video = await Video.findById(videoId);
    if(!video){
        throw new ApiError(400, "video is not found-togglePublishStatus")
    }

    const currStatus = video.isPublished
    video.isPublished = !currStatus
    
    const updatedStatusVideo = await video.save({ validateBeforeSave: false })
    if(!updatedStatusVideo){
        throw new ApiError(400, "error occur while togglePublishStatus")
    }
    return res
    .status(200)
    .json(
        // new ApiResponse(200, "publish status toggled successfullt")
        new ApiResponse(200, updatedStatusVideo, "publish status toggled successfullt")
    )
})

export {
    getAllVideos,
    publishAVideo,
    getVideoById,
    updateVideoDetails,
    updateVideoThumbnail,
    deleteVideo,
    togglePublishStatus
}