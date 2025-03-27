import mongoose, {isValidObjectId} from "mongoose"
import {Playlist} from "../models/playlist.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"


const createPlaylist = asyncHandler(async (req, res) => {
    const {name, description, videoId} = req.body
    if (
        [name, description].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required - createPlaylist")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - createPlaylist")
    }

    const userId = req.user?._id
    if (!isValidObjectId(userId)) {
        throw new ApiError(400, "Invalid userId - createPlaylist")
    }

    const createdPlaylist = await Playlist.create({
        name,
        description,
        videos: [videoId],
        owner: userId
    })

    if (!createdPlaylist) {
        throw new ApiError(500, "something went wrong while creating the playlist")
    }

    return res.status(200).json(
        new ApiResponse(200, createdPlaylist, "playlist created successfully")
    )
})

const getPlaylistById = asyncHandler(async (req, res) => {
    const {playlistId} = req.params
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
    const {playlistId} = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - updatePlaylist")
    }

    const {name, description} = req.body
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
    const {playlistId, videoId} = req.params
    if (!isValidObjectId(playlistId)) {
        throw new ApiError(400, "Invalid playlistId - addVideoToPlaylist")
    }

    if (!isValidObjectId(videoId)) {
        throw new ApiError(400, "Invalid videoId - addVideoToPlaylist")
    }

    const isVideoAlreadyInPlaylist = await Playlist.findOne({
        _id: playlistId,
        videos: videoId 
    })

    if (isVideoAlreadyInPlaylist) {
        return res.status(200).json(new ApiResponse(200, "video already existed in playlist"))
    }
    const playlist = await Playlist.findByIdAndUpdate(
        playlistId,
        {
            $push: { videos: videoId }
        },
        { new: true, runValidators: true }
    )

    if (!playlist) {
        throw new ApiError(400, "error while adding video to playlist")
    }

    return res.status(200).json(
        new ApiResponse(200, playlist, "video added to playlist Successfully")
    )
})

const removeVideoFromPlaylist = asyncHandler(async (req, res) => {
    const {playlistId, videoId} = req.params
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
    const {playlistId} = req.params
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
    const {userId} = req.params
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

export {
    createPlaylist,
    getPlaylistById,
    addVideoToPlaylist,
    removeVideoFromPlaylist,
    deletePlaylist,
    updatePlaylist,
    getUserPlaylists
}