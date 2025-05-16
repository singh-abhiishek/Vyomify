import { apiSlice } from "./apiSlice";

const SUBSCRIPTIONS_URL = import.meta.env.VITE_SUBSCRIPTIONS_URL;

export const subscriptionApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // toggle subscribe
        toggleSubscriptions: builder.mutation({
            query: (channelId) => ({
                url: `${SUBSCRIPTIONS_URL}/c/${channelId}`,
                method: "POST",
            }),           
            invalidatesTags: ['Subscription'],
        }), 


        // get channel subscribers
        getChannelSubscribers: builder.query({
            query: ({channelId}) => ({
                url: `${SUBSCRIPTIONS_URL}/c/${channelId}`,
                method: "GET",
            }),
            providesTags: ['Subscription'],
        }),

        // get subscribed channels list
        getSubscribedChannels: builder.query({
            query: (subscriberId) => ({
                url: `${SUBSCRIPTIONS_URL}/u/${subscriberId}`,
                method: "GET",
            }),
            providesTags: ['Subscription'],
        }),

        // check is user subscribed the channel or not
        checkSubscriptionStatus: builder.query({
            query: (channelId) => ({
                url: `${SUBSCRIPTIONS_URL}/c/status/${channelId}`,
                method: "GET",
            }),
            providesTags: ['Subscription'],
        }),

        // get latest videos of subscribed channels 
        getLatestVideosOfSubscribedChannels: builder.query({
            query: (subscriberId) => ({
                url: `${SUBSCRIPTIONS_URL}/u/latest/${subscriberId}`,
                method: "GET",
            }),
        }),
    })
})

export const {
    useToggleSubscriptionsMutation,
    useGetChannelSubscribersQuery,
    useGetSubscribedChannelsQuery,
    useCheckSubscriptionStatusQuery,
    useGetLatestVideosOfSubscribedChannelsQuery,
} = subscriptionApiSlice