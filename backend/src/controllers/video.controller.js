import mongoose, { isValidObjectId } from "mongoose"
import { Video } from "../models/video.model.js"
import { User } from "../models/user.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { deleteFromCloudinary, uploadOnCloudinary } from "../utils/cloudinary.service.js"
import { Playlist } from "../models/playlist.model.js"



export const authorizedOwner = (userId, req) => {
    console.log({ userId });

    return userId.toString() === req.user._id.toString();
};

const addVideoToPlaylistUtility = asyncHandler(async (videoId, playlistId, req) => {
    if (!videoId || !playlistId) {
        throw new ApiError(400, "video id or playlist id is not provided");
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - addVideoToPlaylistUtility")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - addVideoToPlaylistUtility")
    }

    const playlist = await Playlist.findById(playlistId);

    if (!playlist) {
        throw new ApiError(400, "Playlist does not exist in DB - addVideoToPlaylistUtility")
    }

    if (!authorizedOwner(playlist.owner, req)) {
        throw new ApiError(401, "unauthorized access - addVideoToPlaylistUtility");
    }

    if (playlist.videos.includes(videoId)) {
        // check if the video is already part of the playlist
        return;
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: { videos: videoId }
        },
        { new: true, runValidators: true }
    )

    if (!updatedPlaylist) {
        throw new ApiError(400, "error while adding video to playlist - addVideoToPlaylistUtility")
    }

    return { success: true, playlist: updatedPlaylist }
})

// DEBUG: may be bug in this route
const getAllVideos = asyncHandler(async (req, res) => {

    const {
        sortBy = "createdAt",
        limit = 10,
        page = 1,
        sortType = -1,
    } = req.query;

    // aggregration pipeline to get all videos
    const allVideos = await Video.aggregate([
        {
            $match: {
                isPublished: true, // take only public video
            }
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
                            fullName: 1,
                            userName: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                ownerDetails: { $first: "$ownerDetails" }
            }
        },
        {
            $project: {
                owner: 0,
                ownerUsername: 0
            }
        },
        {
            $sort: {
                [sortBy]: parseInt(sortType),
            },
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
        {
            $limit: parseInt(limit),
        },
    ].filter(Boolean)) // Array se sari falsy values hata do.

    const totalVideosCount = await Video.countDocuments({ isPublished: true });

    res.status(200).json(
        new ApiResponse(
            200,
            {
                allVideos,
                currentPage: parseInt(page),
                totalPages: Math.ceil(totalVideosCount / parseInt(limit)),
                totalVideosCount,
            },
            "All Videos fetched successfully"
        )
    );
})

const getVideosAndChannelBasedOnSearch = asyncHandler(async (req, res) => {
    const { query, page = 1, limit = 10 } = req.query;

    // pipeline for video (same as getAllvideo)
    const searchedVideos = await Video.aggregate([
        {
            $match: {
                $text: {
                    $search: query
                }
            }
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
                            fullName: 1,
                            userName: 1,
                            avatar: 1,
                        },
                    },
                ],
            },
        },
        {
            $addFields: {
                ownerDetails: { $first: "$ownerDetails" }
            }
        },
        {
            $project: {
                owner: 0,
                ownerUsername: 0
            }
        },
        {
            $skip: (parseInt(page) - 1) * parseInt(limit),
        },
        {
            $limit: parseInt(limit),
        },
    ].filter(Boolean))


    // pipeline for search channel
    const searchedChannel = await User.aggregate([
        {
            $match: {
                $or: [
                    { userName: { $regex: new RegExp(query, "i") } },
                    { fullName: { $regex: new RegExp(query, "i") } },
                ],
            },
        },
        {
            $lookup: {
                from: "videos",
                let: { ownerId: "$_id" }, // searched user ka id -> video ka ownerId hoga
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$owner", "$$ownerId"],
                            },
                        },
                    },
                    {
                        $sort: {
                            createdAt: -1,
                        },
                    },
                    {
                        $limit: 10,
                    },
                ],
                as: "videos",
            },
        },
        {
            $match: {             // Ye $match un documents ko filter karta hai jinke videos array empty nahi hai.
                "videos.0": {     // "videos.0" ka matlab: videos array ka pehla element (zero-indexed).
                    $exists: true // $exists: true ka matlab: agar wo field exist karti hai, tabhi match karo.
                }
            }
        },
        {
            $lookup: { // channel modal m jake check kro kitne doc hai jisme channel - channelId se match kr rha , to get subscribers
                from: "subscriptions",
                let: { channelId: "$_id" },
                pipeline: [
                    {
                        $match: {
                            $expr: {
                                $eq: ["$channel", "$$channelId"],
                            },
                        },
                    },
                ],
                as: "subscriptions",
            },
        },
        {
            $addFields: {
                subscriberCount: { $size: "$subscriptions" }, // Count total subscribers
                isSubscribedByCurrentUser: {
                    $in: [                                 // check current user ne is channel ko subscribe kiya hai
                        req.user._id,                    // "req.user._id" in [user1, user2, user3]?? check
                        {
                            $map: {
                                input: "$subscriptions", // poori list
                                as: "sub",               // har item ka naam sub
                                in: "$$sub.subscriber",  // har item me se sirf subscriber nikaalo
                            },
                        },
                    ],
                },
            },
        },
        {
            $project: {
                _id: 1,
                fullName: 1,
                avatar: 1,
                userName: 1,
                videoCount: { $size: "$videos" },
                latestVideos: { $slice: ["$videos", 10] }, // The first 10 items are returned.
                subscriberCount: 1,
                isSubscribedByCurrentUser: 1,
            },
        },
        { $limit: 1 },
    ])

    const totalVideos = await Video.countDocuments({ $text: { $search: query } });

    return res.status(200).json(new ApiResponse(
        200,
        {
            searchedVideos,
            channel: searchedChannel || null,
            currentPage: parseInt(page),
            totalPages: Math.ceil(totalVideos / parseInt(limit)),
            totalVideos,
        },
        "video based on search query fetched successfully"
    ))
})

const getAllVideosPublishedByUser = asyncHandler(async (req, res) => {
    const { userId } = req.params
    const { sortBy } = req.query;

    // console.log("from getAllVideosPublishedByUser", sortBy)

    if (!userId) {
        throw new ApiError(400, "userId is missing - getAllVideosPublishedByUser")
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - getAllVideosPublishedByUser")
    }

    // Define sort options
    let sortOptions = {};

    switch (sortBy) {
        case "Latest":
            sortOptions = { createdAt: -1 };
            break;
        case "Oldest":
            sortOptions = { createdAt: 1 };
            break;
        case "Popular":
            sortOptions = { views: -1 };
            break;
        default:
            sortOptions = { createdAt: -1 }; // default to latest
    }

    const publishedVideos = await Video.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
                isPublished: true, //TODO: change it to true
            }
        },
        {
            $sort: sortOptions
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
                            username: 1,
                            fullName: 1,
                            avatar: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                owner: { $first: "$owner" }
            }
        },
        {
            $project: {
                ownerUsername: 0,
            }
        }
    ]);

    // console.log("all published videos from getAllPublishedVideosByUser", publishedVideos);

    if (!publishedVideos) {
        throw new ApiError(400, "user does not exist - getAllVideosPublishedByUser")
    }

    return res.status(200).
        json(new ApiResponse(
            200,
            publishedVideos,
            "all videos published by user fetched successfully "
        ))

})

const publishAVideo = asyncHandler(async (req, res) => {
    const { title, description, isPublished } = req.body

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
        throw new ApiError(410, "video file is required *missing")
    }

    const thumbnailLocalPath = req.files?.thumbnail[0]?.path
    if (!thumbnailLocalPath) {
        throw new ApiError(410, "video file is required *missing")
    }

    //upload video and file on cloudinary
    const videoFile = await uploadOnCloudinary(videoLocalPath)
    if (!videoFile) {
        throw new ApiError(410, "videoFile file not uploaded")
    }

    const thumbnail = await uploadOnCloudinary(thumbnailLocalPath)
    if (!thumbnail) {
        throw new ApiError(410, "thumbnail file not uploaded")
    }

    // get user from req.user (verifyJWT middleware append it)
    const userId = req.user?._id
    const owner_username = req.user?.username

    // create video model
    const isPublic = (isPublished === "public") ? true : false;
    const video = await Video.create(
        {
            videoFile: videoFile.url, // cloudinary
            thumbnail: thumbnail.url, // cloudinary
            title,
            description,
            views: 0,
            duration: videoFile.duration,
            isPublished: isPublic,
            owner: userId,
            ownerUsername: owner_username
        }
    )

    //********** check for video creation/publish **********//
    if (!video) {
        throw new ApiError(500, "something went wrong while publishing video")
    }


    // if user select the playlists while publishing video
    // add video to playlistsId;

    // NOTE:- When data is sent from the frontend to backend, especially in POST requests with content type like application/json or multipart/form-data, arrays may be sent as JSON strings.
    // '["123", "456", "789"]'  // string, not array
    // You can't work with it as an array (e.g., .map() or .push()) unless you parse it.


    let playlistIds = [];
    playlistIds = JSON.parse(req.body.playlistIds || "[]");

    if (Array.isArray(playlistIds) && playlistIds.length > 0) {
        for (const playlistId of playlistIds) {
            // console.log(`Adding video to playlist ${playlistId}`);

            addVideoToPlaylistUtility(video._id, playlistId, req);
        }
    }

    return res.status(201).json(
        new ApiResponse(200, video, "video published successfully")
    )
})

//TODO: kya user ki watchHistory m yahi se add krna hoga? (user ki watchHistory Schema alg bnane pe yha bhi change kro)
const getVideoById = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - videoByid")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - videoByid")
    }

    const userId = req.user?._id
    await User.findByIdAndUpdate(
        userId,
        {
            $push: {
                watchHistory: videoId
            }
        },
        { new: true },
        { validateBeforeSave: false }
    )

    await Video.updateOne( // update views on video
        { _id: new mongoose.Types.ObjectId(videoId) },
        { $inc: { views: 1 } }
    )

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
                            // username: 1,
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
            new ApiResponse(200, video[0], "video gets successfully")
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
    if (!isValidObjectId(videoId)) {
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
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "videoId is inValid while updating video")
    }

    const video = await Video.findById(videoId)
    const videoFileUrl = video.videoFile
    const thumbnailUrl = video.thumbnail

    const deletedVideoFileRes = await deleteFromCloudinary(videoFileUrl)
    const deletedThumbnailRes = await deleteFromCloudinary(thumbnailUrl)

    if (!deletedVideoFileRes || !deletedThumbnailRes) {
        throw new ApiError(400, "error while deleting video documents from cloudinary")
    }

    const deletedVideo = await Video.findByIdAndDelete(videoId)
    if (!deletedVideo) {
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
    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "inValid videoId- togglePublishStatus")
    }

    const video = await Video.findById(videoId);
    if (!video) {
        throw new ApiError(400, "video is not found-togglePublishStatus")
    }

    const currStatus = video.isPublished
    video.isPublished = !currStatus

    const updatedStatusVideo = await video.save({ validateBeforeSave: false })
    if (!updatedStatusVideo) {
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
    getAllVideosPublishedByUser,
    publishAVideo,
    getVideoById,
    updateVideoDetails,
    updateVideoThumbnail,
    deleteVideo,
    togglePublishStatus,
    addVideoToPlaylistUtility,
    getVideosAndChannelBasedOnSearch
}