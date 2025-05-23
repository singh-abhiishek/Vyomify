import { apiSlice } from "./apiSlice";

const LIKES_URL = import.meta.env.VITE_LIKES_URL;

export const likeApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // toggle video like
        toggleVideoLikeStatus: builder.mutation({
            query: (videoId) => ({
                url: `${LIKES_URL}/toggle/v/${videoId}`,
                method: "POST",
            }),
             invalidatesTags: ['VideoLike'],
        }),

        // get total like on a video
        totalLikesOnVideo: builder.query({
            query: (videoId) => ({
                url: `${LIKES_URL}/count/v/${videoId}`,
                method: "GET",
            }),
            providesTags: ['VideoLike'],
        }),

        
        // get total liked videos
        getTotalLikedVideos: builder.query({
            query: () => ({
                url: `${LIKES_URL}/videos`,
                method: "GET",
            })
        }),

        // toggle comment like
        toggleCommentLikeStatus: builder.mutation({
            query: (commentId) => ({
                url: `${LIKES_URL}/toggle/c/${commentId}`,
                method: "POST",
            }),
            invalidatesTags: (result, error, commentId) => [
                { type: 'CommentLike', id: commentId },
            ],
        }),

        // toggle comment like
        toggleTweetLikeStatus: builder.mutation({
            query: (tweetId) => ({
                url: `${LIKES_URL}/toggle/t/${tweetId}`,
                method: "POST",
            }),
        }),

        // get total like on a comment
        totalLikesOnComment: builder.query({
            query: (commentId) => ({
                url: `${LIKES_URL}/count/c/${commentId}`,
                method: "GET",
            }),
            providesTags: (result, error, commentId) => [
                { type: 'CommentLike', id: commentId },
            ],
        }),

        // get total like on a tweet
        totalLikesOnTweet: builder.query({
            query: (tweetId) => ({
                url: `${LIKES_URL}/count/t/${tweetId}`,
                method: "GET",
            }),
        }),

        isAlreadyLiked: builder.query({
            query: ({targetId, type}) => ({
                url: `${LIKES_URL}/${targetId}?type=${type}`,
                method: "GET",
            })
        }),

    })
})

export const {
    useToggleVideoLikeStatusMutation,
    useToggleTweetLikeStatusMutation,
    useToggleCommentLikeStatusMutation,
    useTotalLikesOnVideoQuery,
    useTotalLikesOnCommentQuery,
    useTotalLikesOnTweetQuery,
    useGetTotalLikedVideosQuery,
    useIsAlreadyLikedQuery,

} = likeApiSlice