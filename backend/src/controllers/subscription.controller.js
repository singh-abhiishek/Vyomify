import mongoose, {isValidObjectId} from "mongoose"
import {User} from "../models/user.model.js"
import { Subscription } from "../models/subscription.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const toggleSubscription = asyncHandler(async (req, res) => {
    const {channelId} = req.params
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
        return res.status(200).json(new ApiResponse(200, "channel Unsubscribed Successfully"))
    }else{
        const response = await Subscription.create({
            subscriber: userId,
            channel: channelId  
        })
        if (!response) {
            throw new ApiError(400, "error while subscribing channel - toggleSubscription")
        }
        return res.status(200).json(new ApiResponse(200, response, "channel Subscribed Successfully"))
    }
})

// controller to return subscriber list of a channel
const getUserChannelSubscribers = asyncHandler(async (req, res) => {
    const { channelId } = req.params
    if (!isValidObjectId(channelId)) {
        throw new ApiError(400, "Invalid channelId - getUserChannelSubscribers")
    }

    const subscribers = await Subscription.countDocuments({ channel: channelId })
    if (!subscribers) {
        throw new ApiError(400, "error while counting subscribers")
    }
    return res.status(200).json(new ApiResponse(200, subscribers, "user subscribers fetched successfully"))
})

// controller to return channel list to which user has subscribed
const getSubscribedChannels = asyncHandler(async (req, res) => {
    const { subscriberId } = req.params
    if (!isValidObjectId(subscriberId)) {
        throw new ApiError(400, "Invalid subscriberId - getSubscribedChannels")
    }

    const subscribedTo = await Subscription.countDocuments({ subscriber: subscriberId })
    if (!subscribedTo) {
        throw new ApiError(400, "error while counting subscribedTo")
    }
    return res.status(200).json(new ApiResponse(200, subscribedTo, "user subscribedTo channel fetched successfully"))
})

export {
    toggleSubscription,
    getUserChannelSubscribers,
    getSubscribedChannels
}