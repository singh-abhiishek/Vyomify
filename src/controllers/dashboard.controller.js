import mongoose, { Aggregate } from "mongoose"
import {Video} from "../models/video.model.js"
import {Subscription} from "../models/subscription.model.js"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const getChannelStats = asyncHandler(async (req, res) => {
    // Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const userId = req.user?._id
    if(!userId) {
        throw new ApiError(400, "userId is not found - getChannelStats")
    }

    const totalSubscribers = await Subscription.countDocuments({ channel: userId })
    if (!totalSubscribers) {
        throw new ApiError(400, "error while counting subscribers")
    }

    const totalLikes = await Like.countDocuments({ postOwner: userId })
    if (!totalLikes) {
        throw new ApiError(400, "error while counting totalLikes")
    }

    const response = await Video.aggregate([
        { $match: { owner: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: userId,
                totalViews: { $sum: "$views" },
                totalVideos: { $sum: 1 }
            }
        }
    ])

    if (!response) {
        throw new ApiError(400, "error while calculating views and videos")
    }
    const totalViews = response[0].totalViews
    const totalVideos = response[0].totalVideos

    return res.status(200).json(
        new ApiResponse(200, { totalSubscribers, totalLikes, totalViews, totalVideos }, "channel stats fetched successfully")
    )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    // Get all the videos uploaded by the channel
    const userId = req.user?._id
    if(!userId) {
        throw new ApiError(400, "userId is not found - getChannelVideos")
    }

    const allVideos = await Video.find(
        { owner: userId}
    ).select("-_id -owner -createdAt -updatedAt")

    if(!allVideos) {
        throw new ApiError(400, "error while fetching all videos of channel - getChannelVideos")
    }
    console.log(allVideos)
    return res.status(200).json(new ApiResponse(200, allVideos, "all channel videos fetched successfully"))
})

export {
    getChannelStats, 
    getChannelVideos
}