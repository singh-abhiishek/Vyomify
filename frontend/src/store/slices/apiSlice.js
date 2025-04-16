import { 
    createApi,
    fetchBaseQuery
} from "@reduxjs/toolkit/query/react";
import { checkIfTokenNeedsRefresh } from "../../utils/tokenLifeSpan.js";
import { login as storeLogin, logout as storeLogout } from "./authSlice.js";


// custom basequery
const BASE_URL = import.meta.env.VITE_BASE_URL;
export const baseQuery = fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Ensures that credentials (like cookies) are sent with requests (Fetch API (or RTK Query’s fetchBaseQuery))
    // withCredentials: true, // For Axios
})

// Global flag to prevent simultaneous token refresh calls
let isRefreshing = false;

// Base query with token refresh logic 
// verifyJwt uses accessToken for authentication
// refresh(if expire) the access token based on refresh token(stored in database)
// if refresh token got expired, logout user explicitly
const baseQueryWithAuthRefresh = async (args, api, extraOptions) => {
    const state = api.getState()
    const accessToken = state.auth.accessToken
    const refreshToken = state.auth.refreshToken

    if (accessToken && checkIfTokenNeedsRefresh(accessToken) && !isRefreshing){
        isRefreshing = true;

        console.info("Token nearing expiry, refreshing...");

        const refreshResult = await baseQuery(
            {
              url: "/api/v1/users/refresh-token",
              method: "POST",
              body: refreshToken, // NOTE:- token also stored in cookies, you can avoid to send it in body
            },
            api,
            extraOptions
        );

        if (refreshResult.data) {   // TODO: update user 
            console.info("Token refreshed successfully");
      
            const responseData = refreshResult.data;
            api.dispatch(storeLogin(responseData?.data));
        } 
        else { // for Unauthorized request
            // NOTE: if refresh token expired, it will throw an error, so we logout user, so that it can reset the both token
            console.error("Token refresh failed");
            api.dispatch(storeLogout("Session expired, please login again")); // Log the user out
            window.location.href = "/login"; // Redirect to login page
            isRefreshing = false; // Release the lock after failure
            return refreshResult; // Exit with the refresh error
        }

        isRefreshing = false; // Release the lock after the refresh request completes
    }

    // Original API call
    let result = await baseQuery(args, api, extraOptions);
    console.log("from 65 apislice", result)

    // Agar 405 error aaye to logout
    if (result.error && result.error.status === 405) {
      console.error("Unauthorized! Logging out...");
      api.dispatch(storeLogout("Session expired, please login again"));
    //   window.location.href = "/login"; // Redirect to login
    }
  
    return result;
}

// dynamic base query function
const dynamicBaseQuery = async (args, api, extraOptions) => {
    console.log("dynamicBaseQuery:-", "i reach here")
    const {
        url,
        method = "GET", // Default to 'GET'
        body,
        headers = {},
        // useProgress,
        // onProgress,
    } = args;

    // if (useProgress) {
    // return fetchBaseQueryWithProgress({ baseUrl: BASE_URL })(
    //     { url, method, body, headers, onProgress },
    //     api,
    //     extraOptions
    // );
    // }

    return baseQueryWithAuthRefresh({ url, method, body, headers }, api, extraOptions);
}

// Create the API slice 
// initialize an empty api service that we'll inject endpoints into later as needed
export const apiSlice = createApi({
    baseQuery: dynamicBaseQuery,
    tagTypes: [             // Declare allowed tags globally in your API slice
        "User",
        "Comment",
        "Like",
        "Subscription",
        "Playlist",
        "Tweet",
        "Video",
    ],
    endpoints: (builder) => ({}), // define endPoints separately, by:- apiSlice.injectEndpoints()
});
