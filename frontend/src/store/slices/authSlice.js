import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    isUserAuthenticated: false,
    isVerifyEmailPageVisible: false,
    isUploadProfileImagePageVisible: false,
    userData: null
}

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {  // setUserCredentials
            state.isUserAuthenticated = true;
            // console.log(action.payload)
            state.userData = action.payload;
        },
        logout: (state) => {
            // console.log("Logging out...");
            state.isUserAuthenticated = false;
            state.userData = null;
        },
        showVerifyEmailPage: (state, action) => {
            state.isVerifyEmailPageVisible = action.payload;
        },
        showUploadProfileImagePage: (state, action) => {
            state.isUploadProfileImagePageVisible = action.payload;
        }
    }
})


export const { login, logout, showVerifyEmailPage, showUploadProfileImagePage } = authSlice.actions;
export default authSlice.reducer;

export const selectCurrentUser = (state) => state?.auth?.userData

















// ******************************************************************************
// import { createSlice } from "@reduxjs/toolkit"

// const initialState = {
//     isUserAuthenticated: false,
//     isVerifyEmailPageVisible: false,
//     isUploadProfileImagePageVisible: false,
//     userData: null
// }

// const authSlice = createSlice({
//     name: "auth",
//     initialState,
//     reducers: {
//         login: (state, action) => {
//             state.isUserAuthenticated = true;
//             console.log(action.payload)
//             state.userData = action.payload;
//         },
//         logout: (state) => {
//             console.log("Logging out...");
//             state.isUserAuthenticated = false;
//             state.userData = null;
            
//         },
//         showVerifyEmailPage: (state, action) => {
//             state.isVerifyEmailPageVisible = action.payload;
//         },
//         showUploadProfileImagePage: (state, action) => {
//             state.isUploadProfileImagePageVisible = action.payload;
//         }
//     }
// })


// export const { login, logout, showVerifyEmailPage, showUploadProfileImagePage } = authSlice.actions;
// export default authSlice.reducer;