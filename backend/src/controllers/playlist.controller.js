import mongoose, { isValidObjectId, mongo } from "mongoose"
import { Playlist } from "../models/playlist.model.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { asyncHandler } from "../utils/asyncHandler.js"
import { addVideoToPlaylistUtility } from "./video.controller.js"

export const authorizedOwner = (userId, req) => {
    // console.log({ userId });
    return userId.toString() === req.user._id.toString();
};

const createPlaylist = asyncHandler(async (req, res) => {
    const { name, description, isPrivate } = req.body
    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required - createPlaylist")
    }

    const userId = req.user?._id
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - createPlaylist")
    }

    const isSameNamePlaylistExist = await Playlist.findOne({
        owner: new mongoose.Types.ObjectId(userId),
        name: name
    })

    if (isSameNamePlaylistExist) {
        throw new ApiError(409, "playlist with this name already exist - createPlaylist")
    }

    const createdPlaylist = await Playlist.create({
        name,
        description,
        isPrivate,
        owner: userId
    })

    if (!createdPlaylist) {
        throw new ApiError(500, "something went wrong while creating the playlist")
    }

    return res.status(200).json(
        // new ApiResponse(200, createdPlaylist, "playlist created successfully")
        new ApiResponse(200, "", "playlist created successfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    // console.log(playlistId)
    if (!playlistId) {
        throw new ApiError(400, "playlistId is missing - getPlaylistById")
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - getPlaylistById")
    }

    // aggregrate pipeline
    const playlist = await Playlist.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(playlistId)
            }
        },
        {
            $lookup: {
                from: "users",
                localField: "owner",
                foreignField: "_id",
                as: "playlistOwner",
                pipeline: [
                    {
                        $project: {
                            avatar: 1,
                            username: 1,
                            fullName: 1,
                            _id: 1,
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                playlistOwner: {
                    $first: "$playlistOwner"
                }
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videos",
                pipeline: [
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "ownerDetails",
                            pipeline: [
                                {
                                    $project: {
                                        username: 1,
                                        fullName: 1,
                                        avatar: 1,
                                    }
                                },
                            ]
                        }
                    },
                    {
                        $project: {
                            ownerUsername: 0,
                            owner: 0,
                            videoFile: 0,
                        }
                    },
                    {
                        $addFields: {
                            ownerDetails: {
                                $first: "$ownerDetails"
                            }
                        }
                    },
                ]
            }
        },
        {
            $addFields: {
                totalViews: {
                    $sum: {
                        $map: {
                            input: "$videos", // Playlist document ke andar videos array(lookup k baad video array m, each video k paas view field hoga)
                            as: "vid", // // Har element ka naam temporarily "vid" 
                            in: "$$vid.views" // // Fir us "vid" ka views field access kiya
                        }
                    }
                }
            }
        },
        {
            $project: {
                isWatchLater: 0,
                owner: 0
            }
        }
    ])


    return res.status(200).json(
        new ApiResponse(200, playlist[0], "playlist fetched Successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    if (!playlistId) {
        throw new ApiError(400, "playlistId is missing - updatePlaylist")
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - updatePlaylist")
    }

    const { name, description, isPrivate } = req.body
    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required - updatePlaylist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { name, description, isPrivate },
        { new: true }
    )

    if (!updatedPlaylist) {
        throw new ApiError(400, "error while updating playlist")
    }

    return res.status(200).json(
        new ApiResponse(200, updatedPlaylist, "playlist updated Successfully")
    )
})

const addVideoToPlaylist = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        return next(new ApiError(400, "videoId is missing - addVideoToPlaylist"));
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - addVideoToPlaylist")
    }

    let playlistIds = [];
    playlistIds = (req.body.playlistIds || "[]");

    // console.log("from addvideotoplaylists",playlistIds)

    if (Array.isArray(playlistIds) && playlistIds.length > 0) {
        for (const playlistId of playlistIds) {
            // console.log(`Adding video to playlist ${playlistId}`);

            addVideoToPlaylistUtility(videoId, playlistId, req);
        }
    }

    return res.status(200).json(
        new ApiResponse(200, "video added to playlists Successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params

    if (!playlistId) {
        throw new ApiError(400, "playlistId is missing - removeVideoFromPlaylist")
    }

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - removeVideoFromPlaylist")
    }

    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - removeVideoFromPlaylist")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - removeVideoFromPlaylist")
    }


    const playlist = await Playlist.findOneAndUpdate(
        {
            _id: new mongoose.Types.ObjectId(playlistId),
        },
        {
            $pull: { videos: videoId }
        },
        {
            new: true
        }
    )

    return res.status(200).json(
        new ApiResponse(200, "video removed from playlist Successfully")
    )
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params

    if (!playlistId) {
        throw new ApiError(400, "playlistId is missing - deletePlaylist")
    }
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - deletePlaylist")
    }

    const response = await Playlist.findByIdAndDelete(playlistId);
    if (!response) {
        throw new ApiError(400, "error while deleting playlist")
    }

    return res.status(200).json(
        new ApiResponse(200, "playlist deleted Successfully")
    )
})

const getUserPlaylists = asyncHandler(async (req, res) => {
    const { userId } = req.params

    if (!userId) {
        throw new ApiError(400, "userId is missing - getUserPlaylists")
    }

    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - getUserPlaylists")
    }

    // aggregrate pipeline 
    const userPlaylists = await Playlist.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId)
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "videoInfo",
                pipeline: [
                    {
                        $facet: {   // Use $facet when you want to run multiple independent pipelines in parallel on the same set of documents, 
                            latest: [
                                { $sort: { createdAt: -1 } },
                                { $limit: 1 },
                                { $project: { thumbnail: 1, _id: 0 } }
                            ],
                            count: [
                                { $count: "totalVideoCount" }
                            ]
                        }
                    },
                    {
                        $project: {
                            thumbnail: { $arrayElemAt: ["$latest.thumbnail", 0] },
                            totalVideoCount: { $arrayElemAt: ["$count.totalVideoCount", 0] }
                        }
                    }
                ]
            }
        },
        {
            $addFields: {
                videoInfo: {
                    $first: "$videoInfo"
                }
            }
        },
        {
            $project: {
                videos: 0,
                isWatchLater: 0
            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, userPlaylists, "user playlists fetched Successfully")
    )
})

const getUserPlaylistsName = asyncHandler(async (req, res) => {
    const { userId } = req.params
    // console.log(userId)
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - getUserPlaylists")
    }

    const userPlaylists = await Playlist.find({
        owner: userId
    })

    if (!userPlaylists) {
        throw new ApiError(400, "error while fetching user playlists - getUserPlaylists")
    }

    if (!authorizedOwner(userId, req)) {
        return next(
            new ApiError(401, "unauthorized access, you don't own this user")
        );
    }

    const userPlaylistsName = await Playlist.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
            },
        },
        {
            $project: {
                _id: 1,
                name: 1,
            },
        },
    ]);

    // console.log(userPlaylistsName);

    return res.status(200).json(
        new ApiResponse(200, userPlaylistsName, "user playlists name fetched Successfully")
    )
})

const addToWatchLater = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - getUserPlaylists")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getUserPlaylists")
    }

    const userId = req?.user?._id;

    const addVideoToWatchLater = await Playlist.findOneAndUpdate(
        {

            owner: new mongoose.Types.ObjectId(userId),
            name: "Watch Later",
            isWatchLater: true,

        },
        {
            $push: { videos: videoId } // use $push if duplicates are allowed
        },
        {
            new: true
        }
    )

    return res.status(200).json(
        new ApiResponse(200, "video added to watch later successfully")
    )
})

const removeFromWatchLater = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - getUserPlaylists")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getUserPlaylists")
    }

    const userId = req?.user?._id;

    await Playlist.findOneAndUpdate(
        {

            owner: new mongoose.Types.ObjectId(userId),
            name: "Watch Later",
            isWatchLater: true,

        },
        {
            $pull: { videos: videoId }
        },
        {
            new: true
        }
    )

    return res.status(200).json(
        new ApiResponse(200, "video removed from watch later successfully")
    )
})

const isVideoAlreadyInWatchLater = asyncHandler(async (req, res) => {
    const { videoId } = req.params

    if (!videoId) {
        throw new ApiError(400, "videoId is missing - getUserPlaylists")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - getUserPlaylists")
    }

    const userId = req?.user?._id;

    const isAdded = await Playlist.findOne(
        {

            owner: new mongoose.Types.ObjectId(userId),
            name: "Watch Later",
            isWatchLater: true,
            videos: new mongoose.Types.ObjectId(videoId) // this checks inside the array
        }
    )

    // console.log(isAdded)

    if (isAdded) {
        return res.status(200).json(
            new ApiResponse(200, isAdded, "video already added in watch later")
        )
    }

    return res.status(200).json(
        new ApiResponse(200, false, "video is not already added in watch later")
    )
})

const getAllWatchLaterVideos = asyncHandler(async (req, res) => {
    const userId = req.user?._id;

    if (!userId) {
        throw new ApiError(400, "userId is missing", getAllWatchLaterVideos)
    }

    const WatchLaterVideosList = await Playlist.aggregate([
        {
            $match: {
                owner: new mongoose.Types.ObjectId(userId),
                name: "Watch Later",
                isWatchLater: true,
                videos: { $exists: true },
            }
        },
        {
            $lookup: {
                from: "videos",
                localField: "videos",
                foreignField: "_id",
                as: "video",
                pipeline: [
                    {
                        $project: {
                            videoFile: 1,
                            thumbnail: 1,
                            title: 1,
                            description: 1,
                            duration: 1,
                            views: 1,
                            isPublished: 1,
                            ownerUsername: 1,
                            owner: 1,
                            createdAt: 1
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
                                        _id: 1,
                                        avatar: 1,
                                        fullName: 1,
                                        username: 1,
                                        createdAt: 1,
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            ownerDetails: {
                                $first: "$ownerDetails"
                            }
                        }
                    },
                    {
                        $project: {
                            _id: 1,
                            ownerUsername: 0,
                            owner: 0,
                            // createdAt: 0
                        }
                    }
                ]
            }
        },
        {
            $project: {
                videos: 0,
                isPrivate: 0,
                isWatchLater: 0,
                name: 0,
                description: 0,

            }
        }
    ])

    return res.status(200).json(
        new ApiResponse(200, WatchLaterVideosList, "all watch later videos fetced successfully")
    )
})

export {
    createPlaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getUserPlaylists,
    getUserPlaylistsName,
    addToWatchLater,
    removeFromWatchLater,
    isVideoAlreadyInWatchLater,
    getAllWatchLaterVideos
}