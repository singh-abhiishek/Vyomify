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

        // update playlist
        updatePlaylist: builder.mutation({
            query: ({playlistId,... data}) => ({
                url: `${PLAYLISTS_URL}/${playlistId}`,
                method: "PATCH",
                body: data,
            }),
            invalidatesTags: ["DeletePlaylist"],
        }),

        // delete playlist
        deletePlaylist: builder.mutation({
            query: (playlistId) => ({
                url: `${PLAYLISTS_URL}/${playlistId}`,
                method: "DELETE",
            }),
            invalidatesTags: ["DeletePlaylist"],
        }),

        // add video to playlist 
        addVideoToPlaylists: builder.mutation({
            query: ({ videoId, ...playlistIds }) => ({
                url: `${PLAYLISTS_URL}/add/${videoId}`,
                method: "PATCH",
                body: playlistIds,
            }),
            invalidatesTags: ["Playlist"]
        }),

        // remove video from playlist
        removeVideoFromPlaylist: builder.mutation({
            query: ({ videoId, playlistId }) => ({
                url: `${PLAYLISTS_URL}/remove/${videoId}/${playlistId}`,
                method: "PATCH",
            }),
        }),

        // get users playlists
        getUserPlaylists: builder.query({
            query: (userId) => ({
                url: `${PLAYLISTS_URL}/user/${userId}/playlists`
            }),
            providesTags: ["DeletePlaylist"]
        }),

        // get playlist by playlist Id
        getPlaylistById: builder.query({
            query: (playlistId) => ({
                url: `${PLAYLISTS_URL}/${playlistId}`,
                method: "GET"
            }),
            providesTags: ["Playlist"]
        }),

        // get users playlists names
        getUserPlaylistsName: builder.query({
            query: (userId) => ({
                url: `${PLAYLISTS_URL}/user/${userId}/playlistsName`
            }),
            providesTags: ["Playlist"]
        }),

        // add video to watchlater 
        addVideoToWatchLater: builder.mutation({
            query: (videoId) => ({
                url: `${PLAYLISTS_URL}/add/watchLater/${videoId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["WatchLater"]
        }),

        // remove video from watchlater 
        removeVideoFromWatchLater: builder.mutation({
            query: (videoId) => ({
                url: `${PLAYLISTS_URL}/remove/watchLater/${videoId}`,
                method: "PATCH"
            }),
            invalidatesTags: ["WatchLater"]
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
            providesTags: ["WatchLater"]
        }),
    })
})


export const {
    useGetUserPlaylistsQuery,
    useGetPlaylistByIdQuery,
    useGetUserPlaylistsNameQuery,
    useLazyGetUserPlaylistsNameQuery,
    useCreatePlaylistMutation,
    useAddVideoToPlaylistsMutation,
    useAddVideoToWatchLaterMutation,
    useRemoveVideoFromWatchLaterMutation,
    useIsVideoAlreadyInWatchLaterQuery,
    useGetAllWatchLaterVideosQuery,
    useRemoveVideoFromPlaylistMutation,
    useUpdatePlaylistMutation,
    useDeletePlaylistMutation,
} = plalylistApiSlice