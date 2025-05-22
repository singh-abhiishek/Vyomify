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
            })
        }),

        // get all tweets
        getAllTweets: builder.query({
            query: (userId) => ({
                url: `${TWEETS_URL}/user/${userId}`,
                method: "GET",
            })
        }),

        // update tweet

        // detete tweet
    })
})

export const {
    useCreateTweetMutation,
    useGetAllTweetsQuery,
} = tweetApiSlice

