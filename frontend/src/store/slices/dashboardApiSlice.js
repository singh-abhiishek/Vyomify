import { apiSlice } from "./apiSlice";

const DASHBOARD_URL = import.meta.env.VITE_DASHBOARD_URL;

export const dashboardApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // get channel stats
        getChannelStats: builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}/stats`,
                method: "GET",
            }),
        }),

        // get channel videos
        getChannelVideos: builder.query({
            query: () => ({
                url: `${DASHBOARD_URL}/videos`,
                method: "GET",
            })
        }),
    })
})


export const {
    useGetChannelStatsQuery,
    useGetChannelVideosQuery,
} = dashboardApiSlice