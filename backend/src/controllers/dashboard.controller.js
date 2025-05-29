import mongoose, { Aggregate, isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { Subscription } from "../models/subscription.model.js"
import { Like } from "../models/like.model.js"
import { Tweet } from "../models/tweet.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const getChannelStats = asyncHandler(async (req, res) => {
    // Get the channel stats like total video views, total subscribers, total videos, total likes etc.
    const userId = req.user?._id
    if (!userId) {
        throw new ApiError(400, "userId is not found - getChannelStats")
    }

    const countSubscribers = await Subscription.countDocuments({ channel: userId })
    const countSubscribedTo = await Subscription.countDocuments({ subscriber: userId })
    const countLikes = await Like.countDocuments({ postOwner: userId })
    const countTweets = await Tweet.countDocuments({ owner: userId })

    const response = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $group: {
                _id: "$owner", // group by owner
                countViews: { $sum: "$views" },
                countVideos: { $sum: 1 }
            }
        },
        {
            $project: {
                _id: 0,
            }
        }
    ])

    const countViews = response[0]?.countViews || 0;
    const countVideos = response[0]?.countVideos || 0;

    return res.status(200).json(
        new ApiResponse(
            200,
            {
                countSubscribers,
                countSubscribedTo,
                countLikes,
                countTweets,
                countViews,
                countVideos
            },
            "channel stats fetched successfully")
    )
})

const getChannelVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id

    if (!userId) {
        throw new ApiError(400, "userId is missing - getChannelVideos")
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - getChannelVideos")
    }

    // aggregrate
    const allVideos = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $project: {
                owner: 0,
                ownerUsername: 0,
                videoFile: 0,
            }
        },
        {
            $lookup: {
                from: "likes",
                localField: "_id",
                foreignField: "video",
                as: "countLikes",
                pipeline: [
                    {
                        $count: "countLikes"
                    },
                ]
            }
        },
        {
            $addFields: {
                countLikes: { $ifNull: [{ $first: "$countLikes.countLikes" }, 0] }
            }
        }
    ])

    // console.log(allVideos)
    return res.status(200).json(new ApiResponse(200, allVideos, "all videos of channel fetched successfully"))
})

export {
    getChannelStats,
    getChannelVideos
}