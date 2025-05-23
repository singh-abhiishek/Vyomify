import { apiSlice } from "./apiSlice";

const TWEETS_URL = import.meta.env.VITE_TWEETS_URL

export const tweetApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // create tweet
        createTweet: builder.mutation({
            query: (formData) => ({
                url: `${TWEETS_URL}/`,
                method: "POST",
                body: formData,
            }),
            // invalidatesTags: (result, error, arg) => [...]
            //result = server ka response
            //error = agar hua to error
            //arg = wo argument jo tumne query function ko diya tha(yahan tweetId)
            invalidatesTags: (result, error, tweetId) => [
                { type: "Tweet", id: tweetId },
                { type: "Tweet", id: "LIST" }
            ]
        }),

        // get all tweets
        getAllTweets: builder.query({
            query: (userId) => ({
                url: `${TWEETS_URL}/user/${userId}`,
                method: "GET",
            }),
            // providesTags — ye batata hai: "ye query kin cheezon (tags) ka data la rahi hai
            providesTags: (result) =>
                result?.length
                    ? [...result.map(tweet => ({ type: 'Tweet', id: tweet._id })), // Har tweet ke liye ek tag create karta hai: { type: 'Tweet', id: tweet._id }
                    { type: 'Tweet', id: 'LIST' }] // Plus ek special tag add karta hai: { type: 'Tweet', id: 'LIST' }
                    : [{ type: 'Tweet', id: 'LIST' }]

            // RTK Query ko pata chal gaya: "ye query Tweet ki LIST aur individual tweet idon ka data de rahi hai"
        }),

        // edit tweet
        editTweet: builder.mutation({
            query: ({tweetId, formData}) => ({
                url: `${TWEETS_URL}/${tweetId}`,
                method: "PATCH",
                body: formData,
            }),
            invalidatesTags: (result, error, tweetId) => [
                { type: "Tweet", id: tweetId },
                { type: "Tweet", id: "LIST" }
            ]
        }),

        // detete tweet
        deleteTweet: builder.mutation({
            query: (tweetId) => ({
                url: `${TWEETS_URL}/${tweetId}`,
                method: "DELETE",
            }),
            // invalidatesTags use hota hai — "ye mutation kin cheezon ka cache expire kar raha hai?"
            invalidatesTags: (result, error, tweetId) => [
                { type: "Tweet", id: tweetId }, // Tweet ID 123 toh gaya, ab cache se hata do.
                { type: "Tweet", id: "LIST" } // LIST bhi badli, toh GET wali query dubara chalao.
            ]
        }),
    })
})

export const {
    useCreateTweetMutation,
    useGetAllTweetsQuery,
    useEditTweetMutation,
    useDeleteTweetMutation,
} = tweetApiSlice

