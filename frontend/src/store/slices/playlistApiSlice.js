import { apiSlice } from "./apiSlice";

const PLAYLISTS_URL = import.meta.env.VITE_PLAYLISTS_URL;


// below are all request to backend for different operation 
export const plalylistApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // create new playlist 
        createPlaylist: builder.mutation({
            query: (data) => ({
                url: PLAYLISTS_URL,
                method: "POST",
                body: data,
            }),
        }),

        // add video to playlist add/:videoId
        addVideoToPlaylists: builder.mutation({
            query: ({videoId, ...playlistIds}) => ({
                url: `${PLAYLISTS_URL}/add/${videoId}`,
                method: "PATCH",
                body: playlistIds,
            }),
        }),

        // delete playlist


        // get users playlists
        getUserPlaylists: builder.query({
            query: (userId) => ({
                url: `${PLAYLISTS_URL}/user/${userId}`
            }),
        }),

        // get users playlists names
        getUserPlaylistsName: builder.query({
            query: (userId) => ({
                url: `${PLAYLISTS_URL}/user/${userId}/playlistsName`
            }),
        }),

        // add video to watchlater 
        addVideoToWatchLater: builder.mutation({
            query: (videoId) => ({
                url: `${PLAYLISTS_URL}/add/watchLater/${videoId}`,
                method: "PATCH"
            }),
        }),

        // remove video from watchlater 
        removeVideoFromWatchLater: builder.mutation({
            query: (videoId) => ({
                url: `${PLAYLISTS_URL}/remove/watchLater/${videoId}`,
                method: "PATCH"
            }),
        }),

        // check is video already in watch later
        IsVideoAlreadyInWatchLater: builder.query({
            query: (videoId) => ({
                url: `${PLAYLISTS_URL}/check/watchLater/${videoId}`,
                method: "GET"
            }),
        }),

        // get all watch later videos
        getAllWatchLaterVideos: builder.query({
            query: () => ({
                url: `${PLAYLISTS_URL}/u/watchLater/`,
                method: "GET"
            }),
        }),
    })
})


export const {
    useGetUserPlaylistsQuery,
    useGetUserPlaylistsNameQuery,
    useLazyGetUserPlaylistsNameQuery,
    useCreatePlaylistMutation,
    useAddVideoToPlaylistsMutation,
    useAddVideoToWatchLaterMutation,
    useRemoveVideoFromWatchLaterMutation,
    useIsVideoAlreadyInWatchLaterQuery,
    useGetAllWatchLaterVideosQuery,
} = plalylistApiSlice