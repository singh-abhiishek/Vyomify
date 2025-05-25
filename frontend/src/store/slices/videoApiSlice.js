import { apiSlice } from "./apiSlice";

const VIDEOS_URL = import.meta.env.VITE_VIDEOS_URL;

export const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // publish video
        publishVideo: builder.mutation({
            query: ({ formData, onProgress }) => {
                // url: VIDEOS_URL,
                // method: "POST",
                // body: formData,

                return {
                    url: VIDEOS_URL,
                    method: "POST",
                    body: formData,
                    headers: { "Content-Type": "multipart/form-data" },
                    useProgress: true, // Activate progress tracking
                    onProgress, // Pass the progress callback
                }
            },
        }),

        // get all videos published by login user // publlic video
        getAllPublishedVideos: builder.query({
            query: ({ userId, sortBy }) => ({
                url: `${VIDEOS_URL}/published-Video/${userId}?sortBy=${sortBy}`,
                method: "GET"
            }),
            invalidatesTags: ["VideoToggle"]
        }),

        // get video by id
        getVideoById: builder.query({
            query: (userId) => ({
                url: `${VIDEOS_URL}/${userId}`,
                method: "GET",
            })
        }),

        // get all videos published on the vyomify
        getAllVideos: builder.query({
            query: ({ limit = 10, page = 1 }) => ({
                url: `${VIDEOS_URL}?page=${page}&limit=${limit}&sortBy=createdAt&sortType=-1`,
                method: "GET",
            })
        }),

        // get all videos based on search query
        getAllSearchedVideos: builder.query({
            query: (query) => {
                return {
                    url: `${VIDEOS_URL}/search-video?query=${query}`,
                    method: "GET",
                }
            },
            providesTags: ["SubscriptionCheck"]
        }),

        // toggle video publish status 
        toggleVideoPublishStatus: builder.mutation({
            query: (videoId) => ({
                url: `${VIDEOS_URL}/toggle/publish/${videoId}`,
                method: "PATCH"
            }),
            providesTags: ["VideoToggle"]
        }),

        // update video details (title, description)
        updateVideoDetails: builder.mutation({
            query: ({ videoId, ...details }) => ({
                url: `${VIDEOS_URL}/${videoId}`,
                method: "PATCH",
                body: details
            })
        }),

        // update video thumbnail 
        updateVideoThumbail: builder.mutation({
            query: ({ videoId, formData }) => ({
                url: `${VIDEOS_URL}/update-thumbnail/${videoId}`,
                method: "PATCH",
                body: formData
            })
        }),
    }),
})


export const {
    usePublishVideoMutation,
    useGetAllPublishedVideosQuery,
    useGetVideoByIdQuery,
    useGetAllVideosQuery,
    useGetAllSearchedVideosQuery,
    useToggleVideoPublishStatusMutation,
    useUpdateVideoDetailsMutation,
    useUpdateVideoThumbailMutation,
} = videoApiSlice;