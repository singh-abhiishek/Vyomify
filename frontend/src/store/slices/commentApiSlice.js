import { apiSlice } from "./apiSlice";

const COMMENTS_URL = import.meta.env.VITE_COMMENTS_URL;

export const commentApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        // add comment to video
        addComment: builder.mutation({
            query: ({comment, videoId}) => ({
                url: `${COMMENTS_URL}/${videoId}`,
                method: "POST",
                body: {comment},
            })
        }),

        // get all comments of a video
        getAllComments: builder.query({
            query: (videoId) => ({
                url: `${COMMENTS_URL}/${videoId}`,
                method: "GET",
            }),
        }),

        // update comment
        updateComment: builder.mutation({
            query: ({updatedContent, commentId}) => ({
                url: `${COMMENTS_URL}/c/${commentId}`,
                method: "PATCH",
                body: {updatedContent} 
            }),
        }),

        // delete comment 
        deleteComment: builder.mutation({
            query: (commentId) => ({
                url: `${COMMENTS_URL}/c/${commentId}`,
                method: "DELETE",
            })
        }),
    }),
})


export const {
    useAddCommentMutation,
    useUpdateCommentMutation,
    useDeleteCommentMutation,
    useGetAllCommentsQuery,
} = commentApiSlice
 
