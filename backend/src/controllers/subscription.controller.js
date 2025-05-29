import mongoose, { isValidObjectId } from "mongoose"
import { User } from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!channelId) {
        throw new ApiError(400, "channelId is missing - toggleSubscription")
    }

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId - toggleSubscription")
    }

    const userId = req.user?._id
    if (!userId) {
        throw new ApiError(400, "Invalid userId - toggleSubscription")
    }

    const isSubscribed = await Subscription.findOne(
        {
            subscriber: userId,
            channel: channelId
        }
    )

    if (isSubscribed) {
        const response = await Subscription.findByIdAndDelete(isSubscribed?._id)
        if (!response) {
            throw new ApiError(400, "error while unsubscribing channel - toggleSubscription")
        }
        return res.status(200).json(new ApiResponse(200, { isSubscribed: false }, "channel Unsubscribed Successfully"))
    } else {
        const response = await Subscription.create({
            subscriber: userId,
            channel: channelId
        })
        if (!response) {
            throw new ApiError(400, "error while subscribing channel - toggleSubscription")
        }
        return res.status(200).json(new ApiResponse(200, { isSubscribed: true }, "channel Subscribed Successfully"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    // console.log("getUserChannelSubscribers", channelId)

    if (!channelId) {
        throw new ApiError(400, "channelId is missing - getUserChannelSubscribers")
    }

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId - getUserChannelSubscribers")
    }

    const subscribers = await Subscription.countDocuments({ channel: channelId })

    // console.log("getUserChannelSubscribers",typeof subscribers)
    return res.status(200).json(new ApiResponse(200, subscribers, "user subscribers fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params

    if (!subscriberId) {
        throw new ApiError(400, "subscriberId is missing - getSubscribedChannels")
    }

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriberId - getSubscribedChannels")
    }

    // const subscribedTo = await Subscription.countDocuments({ subscriber: subscriberId })
    // if (!subscribedTo) {
    //     throw new ApiError(400, "error while counting subscribedTo")
    // }
    // return res.status(200).json(new ApiResponse(200, subscribedTo, "user subscribedTo channel fetched successfully"))

    // aggregrate:- to get details of channel to which user subscribed
    const subscribedChannelLists = await Subscription.aggregate([
        {
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {
            $project: {
                _id: 0,
                channel: 1,
            },
        },
        {
            $group: {
                _id: "channels",  // "a group specification must include an _id",
                subscribedChannels: {
                    $push: "$channel",
                },
            },
        },
        {
            $lookup: {
                from: "users",
                localField: "subscribedChannels",
                foreignField: "_id",
                as: "subscribedChannels",
                pipeline: [
                    {
                        $project: {
                            _id: 1,
                            fullName: 1,
                            avatar: 1,
                            username: 1,
                        },
                    },
                ],
            },
        },
        {
            $project: {
                _id: 0,
                subscribedChannels: 1
            }
        }

    ])


    //return res.status(200).json(new ApiResponse(200, subscribedChannelLists, "user subscribedTo channel fetched successfully"))
    // {
    //     "statusCode": 200,
    //     "data": [
    //         {
    //             "subscribedChannels": [
    //                 {
    //                     "_id": "67fe20dfd97bfbb03f75de4d",
    //                     "fullName": "test2",
    //                     "avatar": "http://res.cloudinary.com/singh-abhiishek/image/upload/v1744708534/k5tl1vcnnz8qvnhdghbp.png"
    //                 }
    //             ]
    //         }
    //     ],
    //     "message": "user subscribedTo channel fetched successfully",
    //     "success": true
    // }

    return res.status(200).json(new ApiResponse(200, subscribedChannelLists[0], "user subscribedTo channel fetched successfully"))
    // {
    //     "statusCode": 200,
    //     "data": {
    //         "subscribedChannels": [
    //             {
    //                 "_id": "67fe20dfd97bfbb03f75de4d",
    //                 "fullName": "test2",
    //                 "avatar": "http://res.cloudinary.com/singh-abhiishek/image/upload/v1744708534/k5tl1vcnnz8qvnhdghbp.png"
    //             }
    //         ]
    //     },
    //     "message": "user subscribedTo channel fetched successfully",
    //     "success": true
    // }
})

// to show the latest video, when user clicked on the subscription button
const getLatestVideosFromSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params;

    if (!subscriberId) {
        throw new ApiError(400, "subscriberId is missing - getLatestVideosFromSubscribedChannels")
    }

    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriberId - getLatestVideosFromSubscribedChannels")
    }

    const subscriber = await User.findById(subscriberId);
    if (!subscriber) {
        throw new ApiError(400, "subscriber doesn't exist - getLatestVideosFromSubscribedChannels")
    }

    // we can also add aggregratePaginate (if need)
    const latestVideos = await Subscription.aggregate([
        {   // all subscription doc in which user is subscriber
            $match: {
                subscriber: new mongoose.Types.ObjectId(subscriberId)
            }
        },
        {   // for now we are interested only in those channels (which user subscribed)
            $project: {
                _id: 0,
                channel: 1
            }
        },
        {
            $group: {
                _id: null,
                channelIds: { $addToSet: "$channel" } // Collect all subscribed channels
            }
        },
        {
            $unwind: "$channelIds" // This deconstructs an array into multiple documents — one for each item in the array.
        },
        {
            $lookup: {
                from: "videos",
                let: { channels: "$channelIds" }, // // Now this is a SINGLE channel
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$owner", "$$channels"] // $eq – Use when comparing a single value to another single value
                            }
                        }
                    },
                    {
                        $sort: { createdAt: -1 } // Sort to get the latest videos first
                    },
                    {
                        $limit: 1, // Pick only the latest video per channel
                    },
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            pipeline: [
                                {
                                    $project: {
                                        _id: 1,
                                        fullName: 1,
                                        username: 1,
                                        avatar: 1,
                                    }
                                }
                            ],
                            as: "ownerDetails"
                        }
                    },
                    {
                        $addFields: {
                            ownerDetails: {
                                $first: "$ownerDetails"
                            }
                        }
                    }
                ],
                as: "videos"
            }
        },
        {
            $unwind: "$videos" // Flatten the videos array
        },
        {
            $replaceRoot: {
                newRoot: "$videos" // Replace root with video document
            }
        },
        {
            $limit: 20 // Limit to the latest 20 videos ($sort: { createdAt: -1 } ensure latest videos)
        }
    ])


    return res.status(200).json(
        new ApiResponse(
            200,
            latestVideos,
            "latest videos from the subscribed channel fetched successfully"
        )
    )
})

// route to check user followed a channel or not, to reflect it on subscription btn
// getSubscribedChannels list can also check that (by using arr.some(() => ())) but i think separate end points would be better
const getSubscriptionStatus = asyncHandler(async (req, res) => {
    const { channelId } = req.params

    if (!channelId) {
        throw new ApiError(400, "channelId is missing - getSubscriptionStatus")
    }

    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId - getSubscriptionStatus")
    }

    const subscriberId = req.user?._id
    if (!subscriberId) {
        throw new ApiError(400, "Invalid userId - toggleSubscription")
    }

    const isSubscribed = await Subscription.findOne(
        {
            subscriber: subscriberId,
            channel: channelId
        }
    )

    let subscriptionStatus;
    if (isSubscribed) subscriptionStatus = true;
    else subscriptionStatus = false;

    return res.status(200).json(new ApiResponse(200, subscriptionStatus, "channel subscription status fetched Successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels,
    getLatestVideosFromSubscribedChannels,
    getSubscriptionStatus
}



// const latestVideos1 = await Subscription.aggregate([
//     {
//         $match: {
//             subscriber: new mongoose.Types.ObjectId(subscriberId),
//         },
//     },
//     {
//         $project: {
//             _id: 0,
//             channel: 1,
//         },
//     },
//     {
//         $lookup: {
//             from: "videos",
//             let: { channels: "$channel" },
//             pipeline: [
//                 {
//                     $match: {
//                         $expr: {
//                             $eq: ["$owner", "$$channels"],
//                         },
//                     },
//                 },
//                 {
//                     $sort: {
//                         createdAt: -1, // Ensure videos are sorted by creation date
//                     },
//                 },
//                 {
//                     $lookup: {
//                         from: "users",
//                         localField: "owner",
//                         foreignField: "_id",
//                         pipeline: [
//                             {
//                                 $project: {
//                                     _id: 0,
//                                     fullName: 1,
//                                     userName: 1,
//                                     avatar: 1,
//                                 },
//                             },
//                         ],
//                         as: "owner",
//                     },
//                 },
//                 {
//                     $addFields: {
//                         owner: { $first: "$owner" },
//                     },
//                 },
//                 {
//                     $project: {
//                         _id: 1,
//                         thumbnail: 1,
//                         duration: 1,
//                         views: 1,
//                         owner: 1,
//                         title: 1,
//                         createdAt: 1,
//                         videoFile: 1,
//                     },
//                 },
//             ],
//             as: "video",
//         },
//     },
//     {
//         $unwind: "$video",
//     },
//     {
//         $group: {
//             _id: "$channel",
//             latestVideo: {
//                 $first: "$video", // Take the latest video
//             },
//         },
//     },
//     {
//         $project: {
//             _id: 0,
//             latestVideo: 1,
//         },
//     },
//     {
//         $sort: {
//             "latestVideo.createdAt": -1, // Ensure consistent sorting of final array
//         },
//     },
//     {
//         $group: {
//             _id: null,
//             latestVideos: {
//                 $push: "$latestVideo",
//             },
//         },
//     },
//     {
//         $project: {
//             _id: 0,
//             latestVideos: 1,
//         },
//     },
// ]);