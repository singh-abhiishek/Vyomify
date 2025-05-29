import mongoose, { isValidObjectId } from "mongoose"
import { Tweet } from "../models/tweet.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.service.js"

const createTweet = asyncHandler(async (req, res) => {
    const { tweet, visibility } = req.body

    if (!tweet) {
        throw new ApiError(400, "tweet is missing - createTweet")
    }

    const userId = req.user?._id

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - createTweet")
    }

    if (!userId) {
        throw new ApiError(400, "userId is missing - createTweet")
    }

    let tweetFileLocalPath;
    if (req.files && Array.isArray(req.files.tweetFile) && req.files.tweetFile.length > 0) {
        tweetFileLocalPath = req.files.tweetFile[0].path
    }

    // console.log("tweetfilelocalpath",tweetFileLocalPath)

    let tweet_File;
    if (tweetFileLocalPath) {
        tweet_File = await uploadOnCloudinary(tweetFileLocalPath)
        if (!tweet_File) { // required field, compulsory to check
            throw new ApiError(400, "tweetFile not uploaded")
        }
    }

    // console.log("tweetfile", tweet_File)

    const isPublished = visibility === "private" ? false : true;

    const createdtweet = await Tweet.create({
        content: tweet,
        owner: userId,
        tweetFile: tweet_File?.url,
        isPublished,
    })

    if (!createdtweet) {
        throw new ApiError(500, "something went wrong while - createTweet")
    }

    return res.status(200).json(
        new ApiResponse(200, createdtweet, "tweet created successfully")
    )
})

const getUserTweets = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new ApiError(400, "userId is not missing - createTweet")
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - createTweet")
    }

    const userTweets = await Tweet.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $sort: { createdAt: -1 }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "ownerDetails",
                pipeline: [
                    {
                        $project: {
                            avatar: 1,
                            username: 1,
                            fullName: 1,
                            _id: 1
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                "ownerDetails": {
                    $first: "$ownerDetails"
                }
            }
        }
    ])
    if (!userTweets) {
        throw new ApiError(500, "userTweets not found - getUserTweets")
    }

    // console.log(userTweets)
    return res.status(200).json(
        new ApiResponse(200, userTweets, "userTweets fetched successfully")
    )
})

const updateTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!tweetId) {
        throw new ApiError(400, "tweetId is not missing - updateTweet")
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId - updateTweet")
    }

    const { tweet, visibility, tweetFile } = req.body
    // console.log(req.body)

    if (!tweet) {
        throw new ApiError(400, "tweet is missing - updateTweet")
    }
    const isPublished = visibility;

    // update tweetFile if change
    const tweetFileLocalPath = req.file?.path
    // console.log("tweetFileLocalPath", tweetFileLocalPath)
    if (tweetFileLocalPath) {
        const newTweetFile = await uploadOnCloudinary(tweetFileLocalPath)

        if (!newTweetFile.url) {
            throw new ApiError(400, "Error while updating tweetFile")
        }

        // Delete old tweet file from cloudinary
        const tweet = await Tweet.findOne({
            _id: tweetId
        })
        if (!tweet) {
            throw new ApiError(400, "tweet not found from request while updating tweetFile")
        }
        const oldTweetFileUrl = tweet?.tweetFile; // store old url
        if (oldTweetFileUrl) {
            const oldTweetFilePublicId = oldTweetFileUrl?.split('/upload/')[1].split('/')[1].split('.')[0];
            await deleteFromCloudinary(oldTweetFilePublicId) // delete old tweet file from cloudinary
        }
        tweet.tweetFile = newTweetFile.url // update old url with new one
        await tweet.save({ validateBeforeSave: false })
    }


    const updatedTweet = await Tweet.findByIdAndUpdate(
        tweetId,
        {
            $set: {
                content: tweet,
                isPublished,
            }
        },
        { new: true }
    )

    if (!updatedTweet) {
        throw new ApiError(400, "updatedTweet is not found - updateTweet")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedTweet, "tweet updated successfully")
    )
})

const deleteTweet = asyncHandler(async (req, res) => {
    const { tweetId } = req.params

    if (!tweetId) {
        throw new ApiError(400, "tweetId is missing - deleteTweet")
    }

    if (!isValidObjectId(tweetId)) {
        throw new ApiError(400, "Invalid tweetId  - deleteTweet")
    }

    //delete tweetFile from cloudinary (if tweetFile)
    const tweet = await Tweet.findOne({
        _id: tweetId,
    });
    // console.log("tweet", tweet)

    const TweetFileUrl = tweet?.tweetFile
    // console.log(TweetFileUrl)
    if (TweetFileUrl) {
        const oldtweetFilePublicId = TweetFileUrl?.split('/upload/')[1].split('/')[1].split('.')[0];
        // console.log(oldtweetFilePublicId)
        const response = await deleteFromCloudinary(oldtweetFilePublicId) // delete old Avatar from cloudinary
        if (!response) {
            throw new ApiError(400, "error while deleting tweetFile")
        }
    }

    const response = await Tweet.findByIdAndDelete(tweetId)
    if (!response) {
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