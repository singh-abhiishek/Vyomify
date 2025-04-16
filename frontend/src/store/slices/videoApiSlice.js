import { apiSlice } from "./apiSlice";

const VIDEOS_URL = import.meta.env.VITE_VIDEOS_URL;

export const videoApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({

        // publish video
        publishVideo: builder.mutation({
            query: (formData) => ({
                url: VIDEOS_URL,
                method: "POST",
                body: formData,
            }),
        }),
    }),
})


export const {
    usePublishVideoMutation,
} = videoApiSlice;