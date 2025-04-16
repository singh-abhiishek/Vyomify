import { apiSlice } from "./apiSlice";

const USERS_URL = import.meta.env.VITE_USERS_URL

export const userApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        
        // signup user
        signUp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/Sign-Up`,
                method: "POST",
                body: data,
            })
        }),

        // login user
        login: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/login`,
                method: "POST",
                body: data,
            })
        }),

        // verify Email via otp
        verifyEmailWithOtp: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/verify-Email`,
                method: "POST",
                body: data,
            })
        }),

        // upload profile Image
        uploadProfileImages: builder.mutation({
            query: (formData) => ({
                url: `${USERS_URL}/upload-profile-images`,
                method: "POST",
                body: formData,
            })
        }),

        // resend otp
        resendOTP: builder.mutation({
            query: () => ({
                url: `${USERS_URL}/resend-otp`,
                method: "POST",
            })
        }),

        //reset password
        resetPassword: builder.mutation({
            query: (data) => ({
                url: `${USERS_URL}/reset-password`,
                method: "POST",
                body: data,
            })
        }),  

        // user channel profile
        getUserChannelProfile: builder.query({
            query: (username) => ({
                url: `${USERS_URL}/c/${username}`,
                method: "GET",
            })
        })
    })
})


export const {
    useSignUpMutation,
    useLoginMutation,
    useVerifyEmailWithOtpMutation,
    useUploadProfileImagesMutation,
    useResendOTPMutation,
    useResetPasswordMutation,
    useGetUserChannelProfileQuery,
} = userApiSlice