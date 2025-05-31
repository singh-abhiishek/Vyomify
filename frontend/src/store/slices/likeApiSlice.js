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

            // optimistic update logic:-

            // async onQueryStarted(arg, { dispatch, getState, queryFulfilled, requestId, extra, getCacheEntry }) {
            // api.util.updateQueryData(endpointName, args, updateFunction)
            // endpointName: the name of your query endpoint, e.g., 'getVideos' or 'getVideo'.
            // args: the argument(s) that were passed to that query when it was used.
            // updateFunction: a function that lets you modify the cached result optimistically.

            // async onQueryStarted(videoId, { dispatch, getState, queryFulfilled }) {
            //     // Read current isLiked cache data
            //     const isLikedCache = likeApiSlice.endpoints.isAlreadyLiked.select({ targetId: videoId, type: 'video' })(getState())
            //     console.log('isLikedCache:', isLikedCache);
            //     const isLiked = isLikedCache?.data.data
            //     console.log('isLiked:', isLiked);

            //     // Patch totalLikes query
            //     const patchResult1 = dispatch(
            //         likeApiSlice.util.updateQueryData('totalLikesOnVideo', videoId, (draft) => { // draft can be named as totalLike for a video or anything
            //             draft.data.data += isLiked ? -1 : 1; // decrease if liked, else increase
            //         })
            //     )

            //     // Patch isAlreadyLiked query
            //     const patchResult2 = dispatch(
            //         likeApiSlice.util.updateQueryData('isAlreadyLiked', { targetId: videoId, type: 'video' }, (draft) => {
            //             draft.data.data = !draft.data.data; // toggle like status
            //         })
            //     )

            //     try {
            //         await queryFulfilled;
            //     } catch {
            //         patchResult1.undo();
            //         patchResult2.undo();
            //     }
            // }

            async onQueryStarted(videoId, { dispatch, getState, queryFulfilled }) {
                // Get current like status cache
                const isLikedCache = likeApiSlice.endpoints.isAlreadyLiked.select({ targetId: videoId, type: 'videos' })(getState());
                console.log('isLikedCache', isLikedCache)
                const isLiked = isLikedCache?.data?.data ?? false;
                console.log('isLiked', isLiked)

                // Update totalLikes cache optimistically
                const patchLikes = dispatch(
                    likeApiSlice.util.updateQueryData('totalLikesOnVideo', videoId, (draft) => {
                        if (draft?.data?.data !== undefined) {
                            draft.data.data += isLiked ? -1 : 1;
                        }
                    })
                );

                // Update isAlreadyLiked cache optimistically (toggle)
                const patchIsLiked = dispatch(
                    likeApiSlice.util.updateQueryData('isAlreadyLiked', { targetId: videoId, type: 'videos' }, (draft) => {
                        console.log('draft.data', draft)
                        if (draft?.data?.data !== undefined) {
                            draft.data.data = !draft.data.data;
                        }
                    })
                );

                try {
                    await queryFulfilled;
                } catch (error) {
                    // Undo optimistic update if mutation fails
                    patchLikes.undo();
                    patchIsLiked.undo();
                }
            },

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
            query: ({ targetId, type }) => ({
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