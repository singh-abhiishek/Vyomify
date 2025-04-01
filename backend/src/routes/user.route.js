import { Router } from "express"
import { 
    registerUser, 
    loginUser,
    logoutUser, 
    refreshAccessToken, 
    changeCurrentPassword, 
    getCurrentUser, 
    updateAccountDetails, 
    updateUserAvatar, 
    updateUserCoverImage, 
    getUserChannelProfile, 
    getWatchHistory,
    SignUp,
    resendOtp,
    verifyEmail,
    uploadProfileImages,
    forgotPassword
} from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"

const router = Router()

// router.route("/register").post(
    // upload.fields([   // file handling, multer middleware se hoke jana
    //     {
    //         name: "avatar",  //NOTE: frontend & backend m ye name(avatar) same hona jaruri hai
    //         maxCount: 1
    //     },
    //     {
    //         name: "coverImage", //NOTE: frontend & backend m ye name(coverImage) same hona jaruri hai
    //         maxCount: 1
    //     }
    // ]),
//     registerUser)

router.route("/Sign-Up").post(SignUp)
router.route("/resend-otp").post(resendOtp)
router.route("/verify-Email").post(verifyEmail)
router.route("/upload-profile-images").post(
    verifyJWT,
    upload.fields([   // file handling, multer middleware se hoke jana
        {
            name: "avatar",  //NOTE: frontend & backend m ye name(avatar) same hona jaruri hai
            maxCount: 1
        },
        {
            name: "coverImage", //NOTE: frontend & backend m ye name(coverImage) same hona jaruri hai
            maxCount: 1
        }
    ]),
    uploadProfileImages)

router.route("/login").post(loginUser)
router.route("/reset-password").post(forgotPassword)

// secured routes (using verifyJWT middleware)
router.route("/logout").post(verifyJWT, logoutUser)
// router.route("/logout").post(logoutUser)
router.route("/refresh-token").post(refreshAccessToken)
router.route("/change-password").post(verifyJWT, changeCurrentPassword)
router.route("/current-user").get(verifyJWT, getCurrentUser)
router.route("/update-account").patch(verifyJWT, updateAccountDetails)
router.route("/update-avatar").patch(verifyJWT, upload.single("avatar"), updateUserAvatar)
router.route("/update-coverImage").patch(verifyJWT, upload.single("coverImage"), updateUserCoverImage)
router.route("/c/:username").get(verifyJWT, getUserChannelProfile)
router.route("/history").get(verifyJWT, getWatchHistory)

export default router 