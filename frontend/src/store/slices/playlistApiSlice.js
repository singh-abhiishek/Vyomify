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
    })
})


export const {
    useGetUserPlaylistsQuery,
    useGetUserPlaylistsNameQuery,
    useLazyGetUserPlaylistsNameQuery,
    useCreatePlaylistMutation,
} = plalylistApiSlice