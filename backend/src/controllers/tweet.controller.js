import mongoose, { isValidObjectId } from "mongoose"
import {Tweet} from "../models/tweet.model.js"
import {User} from "../models/user.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const createTweet = asyncHandler(async (req, res) => {
    const { tweetContent } = req.body
    if (!tweetContent) {
        throw new ApiError(400, "tweetContent is not found - createTweet")
    }
    
    const userId = req.user?._id
    if (!userId) {
        throw new ApiError(400, "userId is not found - createTweet")
    }

    const tweet = await Tweet.create({
        content: tweetContent,
        owner: userId
    })

    if (!tweet) {
        throw new ApiError(500, "something went wrong while - createTweet")
    }

    return res.status(200).json(
        new ApiResponse(200, tweet, "tweet created successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params // .route("/user/:userId")
    const userTweets = await Tweet.find(
        {owner: userId}
    )

    if (!userTweets) {
        throw new ApiError(500, "userTweets not found - getUserTweets")
    }

    return res.status(200).json(
        new ApiResponse(200, userTweets, "userTweets fetched successfully")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "tweetId is not found - updateTweet")
    }

    const { updatedContent } = req.body
    if(!updatedContent){
        throw new ApiError(400, "updatedContent is not found - updateTweet")
    }

    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: updatedContent
            }
        },
        { new: true }
    )

    if(!updatedTweet){
        throw new ApiError(400, "updatedTweet is not found - updateTweet")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedTweet, "tweet updated successfully")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params
    if(!isValidObjectId(tweetId)){
        throw new ApiError(400, "tweetId is not found - updateTweet")
    }

    const response = await Tweet.findByIdAndDelete(tweetId)
    if(!response){
        throw new ApiError(400, "error while deleting video")
    }

    return res
    .status(200)
    .json(
        new ApiResponse(200, "Tweet deleted Successfully")
    )
})

export {
    createTweet,
    getUserTweets,
    updateTweet,
    deleteTweet
}