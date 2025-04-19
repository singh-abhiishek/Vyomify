import mongoose, { isValidObjectId } from "mongoose"
import { Like } from "../models/like.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { Video } from "../models/video.model.js"

const toggleVideoLike = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - toggleVideoLike")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - toggleVideoLike")
    }

    const likedBy = req.user?._id
    if (!likedBy) {
        throw new ApiError(400, "likedBy not found - toggleVideoLike")
    }

    const isAlreadyLiked = await Like.findOne(
        {
            video: videoId,
            likedBy
        }
    )

    if (isAlreadyLiked) {
        const response = await Like.findByIdAndDelete(isAlreadyLiked?._id)
        if (!response) {
            throw new ApiError(400, "error while doing video unlike - toggleVideoLike")
        }
        return res.status(200).json(
            new ApiResponse(200, "video unliked Successfully")
        )
    } else {
        const video = await Video.findById(videoId)
        if (!video) {
            throw new ApiError(500, "something went wrong while finding video - toggleVideoLike")
        }

        const likedVideo = await Like.create({
            video: videoId,
            likedBy,
            postOwner: video.owner
        })

        if (!likedVideo) {
            throw new ApiError(500, "something went wrong while - toggleVideoLike")
        }

        return res.status(200).json(
            new ApiResponse(200, likedVideo, "video liked successfully")
        )
    }
})

const toggleCommentLike = asyncHandler(async (req, res) => {
    const { commentId } = req.params
    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid commentId - toggleCommentLike")
    }
    const likedBy = req.user?._id
    if (!likedBy) {
        throw new ApiError(400, "likedBy not found - toggleCommentLike")
    }

    const isAlreadyLiked = await Like.findOne(
        {
            comment: commentId,
            likedBy
        }
    )

    if (isAlreadyLiked) {
        const response = await Like.findByIdAndDelete(isAlreadyLiked?._id)
        if (!response) {
            throw new ApiError(400, "error while doing comment unlike - toggleCommentLike")
        }
        return res.status(200).json(
            new ApiResponse(200, "comment unliked Successfully")
        )
    } else {
        const likedComment = await Like.create({
            comment: commentId,
            likedBy
        })

        if (!likedComment) {
            throw new ApiError(500, "something went wrong while - toggleCommentLike")
        }

        return res.status(200).json(
            new ApiResponse(200, likedComment, "comment liked successfully")
        )
    }
})

const toggleTweetLike = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId - toggleTweetLike")
    }
    const likedBy = req.user?._id
    if (!likedBy) {
        throw new ApiError(400, "likedBy not found - toggleTweetLike")
    }

    const isAlreadyLiked = await Like.findOne(
        {
            tweet: tweetId,
            likedBy
        }
    )

    if (isAlreadyLiked) {
        const response = await Like.findByIdAndDelete(isAlreadyLiked?._id)
        if (!response) {
            throw new ApiError(400, "error while doing tweet unlike - toggleTweetLike")
        }
        return res.status(200).json(
            new ApiResponse(200, "comment unliked Successfully")
        )
    } else {
        const likedTweet = await Like.create({
            tweet: tweetId,
            likedBy
        })

        if (!likedTweet) {
            throw new ApiError(500, "something went wrong while - toggleTweetLike")
        }

        return res.status(200).json(
            new ApiResponse(200, likedTweet, "tweet liked successfully")
        )
    }
})

const getLikedVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;
    if (!userId) {
        throw new ApiError(400, "Invalid userId - getLikedVideos")
    }

    const likedVideos = await Like.aggregate([
        {
            $match: {
                likedBy: new mongoose.Types.ObjectId(userId),
                video: { $exists: true },
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "video",
                foreignField: "_id",
                as: "video",
                pipeline: [
                    {
                        $project: {
                            videoFile: 1,
                            thumbnail: 1,
                            title: 1,
                            descripton: 1,
                            duration: 1,
                            views: 1,
                            isPublished: 1,
                            ownerUsername: 1,
                            owner: 1,
                            createdAt: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                video: {$first: "$video"}
            }
        },
        {
            $project: {
                postOwner: 0,
            }
        }
        // {
        //     $lookup: {
        //         from: "users",
        //         localField: "postOwner",
        //         foreignField: "_id",
        //         as: "postOwner",
        //         pipeline: [
        //             {
        //                 $project: {
        //                     _id: 1,
        //                     avatar: 1,
        //                     fullName: 1,
        //                     username: 1,
        //                     createdAt: 1,
        //                 }
        //             }
        //         ]
        //     }
        // },
        // {
        //     $addFields: {
        //         postOwner: {
        //             $first: "$postOwner"
        //         }
        //     }
        // }
    ])

    if (!likedVideos) {
        throw new ApiError(400, "error while fetching likedVideos")
    }

    return res.status(200).json(
        new ApiResponse(200, likedVideos, "liked videos fetched Successfully")
    )
})

// count likes on video
const getTotalLikesOnVideo = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - getTotalLikesOnVideo")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getTotalLikesOnVideo")
    }

    const totalLikesOnVideo = await Like.countDocuments(
        {
            video: videoId
        }
    )

    return res.status(200).json(new ApiResponse(
        200,
        totalLikesOnVideo,
        "total likes on video fetched Successfully"
    ))

})

const getTotalLikesOnComment = asyncHandler(async (req, res) => {
    const { commentId } = req.params

    if (!commentId) {
        throw new ApiError(400, "videoId is missing - getTotalLikesOnComment")
    }

    if (!isValidObjectId(commentId)) {
        throw new ApiError(400, "Invalid videoId - getTotalLikesOnComment")
    }

    const totalLikesOnComment = await Like.countDocuments(
        {
            comment: commentId
        }
    )

    return res.status(200).json(new ApiResponse(
        200,
        totalLikesOnComment,
        "total likes on comment fetched Successfully"
    ))

})

export {
    toggleCommentLike,
    toggleTweetLike,
    toggleVideoLike,
    getLikedVideos,
    getTotalLikesOnVideo,
    getTotalLikesOnComment,
}