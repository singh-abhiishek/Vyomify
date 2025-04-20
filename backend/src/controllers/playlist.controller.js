import mongoose, { isValidObjectId } from "mongoose"
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
        throw new ApiError(410, "All fields are required - createPlaylist")
    }
    const userId = req.user?._id
    if (!isValidObjectId(userId)) {
        throw new ApiError(410, "Invalid userId - createPlaylist")
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
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid userId - getPlaylistById")
    }

    const playlist = await Playlist.findById(playlistId)
    if (!playlist) {
        throw new ApiError(400, "error while fetching playlists - getPlaylistById")
    }

    return res.status(200).json(
        new ApiResponse(200, playlist, "playlist fetched Successfully")
    )
})

const updatePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - updatePlaylist")
    }

    const { name, description } = req.body
    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required - updatePlaylist")
    }

    const updatedPlaylist = await Playlist.findByIdAndUpdate(
        playlistId,
        { name, description },
        { new: true, runValidators: true }
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

            await addVideoToPlaylistUtility(videoId, playlistId, req);
        }
    }

    return res.status(200).json(
        new ApiResponse(200, "video added to playlists Successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const { playlistId, videoId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - addVideoToPlaylist")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - addVideoToPlaylist")
    }

    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $pull: { videos: videoId }
        },
        { new: true, runValidators: true }
    )

    if (!playlist) {
        throw new ApiError(400, "error while deleting video to playlist")
    }

    return res.status(200).json(
        new ApiResponse(200, playlist, "video deleted from playlist Successfully")
    )
})

const deletePlaylist = asyncHandler(async (req, res) => {
    const { playlistId } = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - addVideoToPlaylist")
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
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - getUserPlaylists")
    }

    const userPlaylists = await Playlist.find({
        owner: userId
    })

    if (!userPlaylists) {
        throw new ApiError(400, "error while fetching user playlists - getUserPlaylists")
    }

    if (userPlaylists.length === 0) {
        return res.status(200).json(new ApiResponse(200, "No playlists found"))
    }

    return res.status(200).json(
        new ApiResponse(200, userPlaylists, "user playlists fetched Successfully")
    )
})

const getUserPlaylistsName = asyncHandler(async (req, res) => {
    const { userId } = req.params
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

export {
    createPlaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getUserPlaylists,
    getUserPlaylistsName
}