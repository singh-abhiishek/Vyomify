import { asyncHandler } from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { TempUser } from "../models/tempUser.modal.js"
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose, { Types } from "mongoose";
import Randomstring from "randomstring"
import { sendOtpToUserEmail, sendOtpToUserForResetPassword, sendSignupDoneToUserEmail } from "../utils/sendEmail.service.js"

const isProduction = process.env.NODE_ENV === "production";

const options = {
    httpOnly: true,   // Secure, JavaScript access nahi karega
    secure: isProduction, // Production pe true rakhein
    sameSite: isProduction ? "None" : "Lax", // Cross-site requests allow
    path: "/",
    maxAge: 24 * 60 * 60 * 1000, // 1 day
}

const generateAccessAndRefreshToken = async (userId, isRefresh) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        if (isRefresh) {
            // add refreshToken in user
            user.refreshToken = refreshToken
    
            // save user
            await user.save({ validateBeforeSave: false })
        }
        return { accessToken, refreshToken }
    } catch (error) {
        console.log("console:", error);

        // throw new ApiError(500, error.message)
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

const generateTemporaryToken = async (tempUserId) => {
    try {
        const tempUser = await TempUser.findById(tempUserId)
        if(!tempUser){
            throw new ApiError(401, "temp user is not found - generateTemporaryToken")
        }
        const tempToken = tempUser.generateTemporaryToken()
        tempUser.tempToken = tempToken
        await tempUser.save({ validateBeforeSave: false })
        return tempToken;
    } catch (error) {
        console.log("console:", error);

        // throw new ApiError(500, error.message)
        throw new ApiError(500, "something went wrong while generating temporary token")
    }
}

const SignUp = asyncHandler(async (req, res) => {
    const { username, email, fullName, password, confirmPassword } = req.body   
    
    if (
        [fullName, email, username, password, confirmPassword].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(409, "All fields are required")
    }

    const isUserExisted = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserExisted) {
        if(isUserExisted.username === username){
            throw new ApiError(409, "Username exists! Time to get creative! ")
        }else{
            throw new ApiError(409, "Email already in use!")
        }
    }

    if (password !== confirmPassword) {
        throw new ApiError(409, "password do not match")
    }

    // generate otp
    // const otp = Randomstring.generate({ length: 6, charset: "numeric"})
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await sendOtpToUserEmail(
        email,
        "OTP for Email verification",
        username,
        otp
    )
    if (!response) {
        throw new ApiError(401, "otp not send to email - error")
    }

    let tempUser = await TempUser.findOne({
        $or: [{ username }, { email }]
    })

    if(tempUser){
        tempUser.username = username;
        tempUser.otp = otp;
        tempUser.email = email;
        tempUser.fullName = fullName;
        tempUser.password = password;
        await tempUser.save();
    }else{
        tempUser = await TempUser.create({
            username,
            email,
            fullName,
            password,
            otp
        })
    }

    if(!tempUser){
        throw new ApiError(409, "error while creating tempUser - SignUp")
    }
    const tempToken  = await generateTemporaryToken(tempUser?._id);
    if(!tempToken){
        await TempUser.findByIdAndDelete(tempUser?._id)
        throw new ApiError(401, "error while generating temp token")
    }

    return res
    .status(200)
    .cookie("tempToken", tempToken, options)
    .json(new ApiResponse(200, "signup process done, email verification left"))
})

const verifyEmail = asyncHandler(async (req, res) => {
    const { otpFilledByUser } = req.body
    const incomingTempToken = req.cookies.tempToken || req.body.tempToken
    if (!incomingTempToken) {
        throw new ApiError(410, "Unauthorized request, try to resend code")
    }
    const decodedTempToken = jwt.verify(
        incomingTempToken,
        process.env.ACCESS_TOKEN_SECRET
    )
    
    if (!decodedTempToken) {
        await TempUser.findByIdAndDelete(decodedTempToken._id)
        throw new ApiError(401, "error occur - verifyEmail")
    }
    const tempUser = await TempUser.findById(new mongoose.Types.ObjectId(decodedTempToken._id))
    if(!tempUser){
        throw new ApiError(410, "tempUser not found through tempToken - verifyEmail")
    }
    const tempuserEmail = tempUser.email
    const tempuserUsername= tempUser.username
    const isUserExisted = await User.findOne({
        $or: [{ tempuserUsername }, { tempuserEmail }]
    })
    
    if (isUserExisted) {
        if(isUserExisted.username === username){
            throw new ApiError(409, "Username exists! Time to get creative! ")
        }else{
            throw new ApiError(409, "Email already in use!")
        }
    }
    
    const decodedOtpThroughToken = tempUser.otp
    if(Number(decodedOtpThroughToken) !== Number(otpFilledByUser)){
        throw new ApiError(409, "otp not matched")
    }
    
    const user = await User.create({
        username: tempUser.username,
        email: tempUser.email,
        fullName: tempUser.fullName,
        password: tempUser.password
    })

    await sendSignupDoneToUserEmail( // not otp but verification mail
        user.email,
        "Account Has Been Successfully Verified",
        user.username
    )

    await TempUser.findByIdAndDelete(decodedTempToken._id)

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, true)
    
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .clearCookie("tempToken", options)
    .json(new ApiResponse(
        200,
        {
            user: loggedInUser,
             //NOTE:  🚀 Backend me jo naam hai (user), Redux slice me uska naam kuch bhi rakh sakte ho (currentUser, loggedInUser, etc.).
            // 🚀 Bas dispatch ke time sahi data pass hona chahiye (data.user).
            // 🚀 useSelector() use karte waqt bhi slice ka jo naam diya hai, wahi use karna hoga.
            accessToken,
            refreshToken
        },
        "email verified successfully"
    ))
})

const resendOtp = asyncHandler(async (req, res) => {
    const incomingTempToken = req.cookies.tempToken || req.body.tempToken
    if (!incomingTempToken) {
        throw new ApiError(401, "Unauthorized request - resendOtp")
    }
    const decodedTempToken = jwt.verify(
        incomingTempToken,
        process.env.ACCESS_TOKEN_SECRET
    )
    
    if (!decodedTempToken) {
        await TempUser.findByIdAndDelete(decodedTempToken._id)
        throw new ApiError(401, "error occur - verifyEmail")
    }
    const tempUser = await TempUser.findById(new mongoose.Types.ObjectId(decodedTempToken._id))
    if (!tempUser) {
        throw new ApiError(410, "Unauthorized request - resendOtp")
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const response = await sendOtpToUserEmail(
        tempUser.email,
        "OTP for Email verification",
        tempUser.username,
        otp
    )
    if (!response) {
        throw new ApiError(401, "otp not send to email - resendOtp")
    }

    if(tempUser){
        tempUser.otp = otp;
        await tempUser.save();
    }

    return res
    .status(200)
    .json(new ApiResponse(
        200,
        "otp resend successfully"
    ))
})

const uploadProfileImages = asyncHandler(async (req, res) => {
    const user = req.user
    if (!user) {
        throw new ApiError(409, "Unauthorizes request - uploadProfileImages")
    }

    let avatarLocalPath;
    if (req.files && Array.isArray(req.files.avatar) && req.files.avatar.length > 0){
        avatarLocalPath = req.files?.avatar[0]?.path;
    }
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    //********** upload them to cloudinary **********//
    let avatar;
    if (avatarLocalPath) {
        avatar = await uploadOnCloudinary(avatarLocalPath)
        if (!avatar) { // required field, compulsory to check
            throw new ApiError(409, "avatar file not uploaded")
        }
    }

    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImage) { // required field, compulsory to check
            throw new ApiError(409, "coverImage file not uploaded")
        }
    }
    const updatedUser = await User.findByIdAndUpdate(
        user._id,
        { 
          avatar: avatar?.url || "", 
          coverImage: coverImage?.url || "" 
        },
        { new: true } // Returns the updated document
      ).select("-password -refreshToken");

    return res.status(200).json(
        new ApiResponse(200, updatedUser, "profile Images updated Successfully")
    )
})

const registerUser = asyncHandler(async (req, res) => {

    //********** get users detail from frontend *********//
    const { username, email, fullName, password } = req.body // req.body is an object
    // console.log( req.body ) :- 
    // [Object: null prototype] {
    //   fullName: 'abhishek',
    //   username: 'abhis',
    //   email: 'abhi@gmail.com',
    //   password: '12345678'
    // }

    // ********* validation - isEmpty? *********//

    // if(fullName === ""){
    //     throw new ApiError(400, "fullname is required")
    // }    

    // OR
    if (
        [fullName, email, username, password].some((field) =>
            field?.trim() === "")
    ) {
        throw new ApiError(400, "All fields are required")
    }

    if (!email.includes("@")) {
        throw new ApiError(400, "Invalid email")
    }
    
    //********** check if users already exists: username, email *********//
    const isUserExisted = await User.findOne({
        $or: [{ username }, { email }]
    })
    if (isUserExisted) {
        throw new ApiError(409, "user with email or username already existed")
    }
    
    //********** take coverImage and avatar local path from multer & check for avatar(required) **********//
    // NOTE:-console.log("avatar:-", req.files) req.files-> given by multer
    // avatar:- [Object: null prototype] {
        //     avatar: [
            //       {
                //         fieldname: 'avatar',
                //         originalname: '1704207796923 (1)-01.jpeg.jpg',
                //         encoding: '7bit',
                //         mimetype: 'image/jpeg',
                //         destination: './public/temp',
                //         filename: '1704207796923 (1)-01.jpeg.jpg',
                //         path: 'public\\temp\\1704207796923 (1)-01.jpeg.jpg',
                //         size: 1230590
                //       }
    //     ]
    //   }
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;
    let coverImageLocalPath;
    if (req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0) {
        coverImageLocalPath = req.files.coverImage[0].path
    }
    if (!avatarLocalPath) {
        throw new ApiError(400, "avatar file is required")
    }
    
    //********** upload them to cloudinary **********//
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    let coverImage;
    if (coverImageLocalPath) {
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
        if (!coverImage) { // required field, compulsory to check
            throw new ApiError(400, "coverImage file not uploaded")
        }
    }
    if (!avatar) { // required field, compulsory to check
        throw new ApiError(400, "avatar file not uploaded")
    }
    
    //********** create user object- create entry in db **********//
    const user = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "", // may be coverImage is not avaiable(above we only check for avatar as it is required field, optional chaining here for coverImage)
        email,
        password,
        username: username.toLowerCase()
    })
    
    //********** remove password and refresh token field from response **********//
    const createdUser = await User.findById(user._id).select(
        "-password -refreshToken"
    )

    //********** check for user creation **********//
    if (!createdUser) {
        throw new ApiError(500, "something went wrong while registering the user")
    }

    //********** return response **********//
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!")
    )
})

const loginUser = asyncHandler(async (req, res) => {

    // take data from req bodys
    const { email, password } = req.body;
    if (!email) {
        throw new ApiError(410, "email is required");
    }
    
    // find the user
    const user = await User.findOne({
        email 
    })
    
    if (!user) {
        // throw new ApiError(404, "User does not exist, please Signup!!");
        throw new ApiError(410, "Can't find you here... Time to join in!");
    }
    
    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)
    if (!isPasswordValid) {
        throw new ApiError(410, "Invalid user Credentials");
    }
    
    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, true)
    
    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")
    
    // send cookie
    // const options = {  
    //     httpOnly: true,  // true krne se cookie ab sirf server se modify ho skta hai 
    //     secure: true
    // }

    // "refreshToken": This is the name of the cookie. It's the key used to store the refresh token in the user's browser.
    // refreshToken: This is the value of the cookie, which is the actual refresh token string.
    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {   // when we set token in cookies,
                    // what is the need of sending it in json format??
                    // may be user want to save it in localstorage (not good practice)
                    // may be use in native mobile apps (as we can't set cookies in native mobile apps) 
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "User Logged In Successfully"
            )
        )
})

const logoutUser = asyncHandler(async (req, res) => {

    const id = new mongoose.Types.ObjectId('67ead188d8db5cf386238e25')
    const response = await User.findOneAndUpdate(
    //   req.user._id,  //NOTE:- req m user._id kaha se aaya??? verifyJWT middleware k through
        id,  //NOTE:- req m user._id kaha se aaya??? verifyJWT middleware k through
        {
            $unset: {
                refreshToken: 1 // this removes the field from document
            }
        },
        {
            // The new option tells Mongoose to return the updated document instead of the old one 
            new: true
        }
    )

    if(!response){
        throw new ApiError(410, "error while logout user")
    }
    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
        .status(200)
        .clearCookie("accessToken", options)  // cookie-parser k through cookie set aur clear ho rha hai
        .clearCookie("refreshToken", options)
        .json(
            new ApiResponse(
                200, {}, "User Logged Out Successfully"
            )
        )
})

const refreshAccessToken = asyncHandler(async (req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken

        if (!incomingRefreshToken) {
            throw new ApiError(401, "Unauthorizes request")
        }

        const decodedRefreshToken = jwt.verify(
            incomingRefreshToken,
            process.env.REFRESH_TOKEN_SECRET
        )

        const user = await User.findById(decodedRefreshToken?._id) // NOTE: from userSchema.methods.generateRefreshToken

        if (!user) {
            throw new ApiError(401, "Invalid refresh token")
        }

        if (incomingRefreshToken !== user?.refreshToken) {
            throw new ApiError(401, "refresh token is expired or used")
        }

        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, false)
        return res
            .status(200)
            .cookie("accessToken", accessToken, options)
            .json(
                new ApiResponse(
                    200,
                    {
                        accessToken: accessToken,
                        // refreshToken: refreshToken
                    },
                    "access token refreshed"
                    // "access and refresh token refreshed"
                )
            )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

//reset password
const forgotPassword = asyncHandler(async (req, res) => {
    const { email, otp = "", newPassword = "", confirmPassword = "" } = req.body
    if(!email){
        throw new ApiError(409, "Email is required")
    }

    const user = await User.findOne({email})
    if(!user){
        throw new ApiError(409, "user does not registered")
    }

    if(email && (!otp && !newPassword && !confirmPassword)){
        const otpForPasswordReset = Math.floor(100000 + Math.random() * 900000).toString();

        let tempUser = await TempUser.findOne({email})
        if(tempUser){
            tempUser.otp = otpForPasswordReset
            await tempUser.save();
        }else{
            tempUser = await TempUser.create({
                email,
                otp: otpForPasswordReset
            })
        }
        console.log(tempUser)

        if(!tempUser){
            throw new ApiError(409, "error while creating tempUser - forgotPassword")
        }

        const response = await sendOtpToUserForResetPassword(
            email,
            "OTP to reset password",
            user.username,
            otpForPasswordReset
        )
        if (!response) {
            await tempUser.findByIdAndDelete(tempUser._id)
            throw new ApiError(401, "otp not send to email - error")
        }

        return res.status(200).json(new ApiResponse(200, "Otp send to user registered email - "))
    }else{
        if(!email || !otp || !newPassword || !confirmPassword){
            throw new ApiError(409, "All field are required")
        }

        const tempUser = await TempUser.findOne({email});
        if(!tempUser){
            throw new ApiError(409, "tempUser does not exist")
        }

        if(Number(tempUser.otp) !== Number(otp)){
            throw new ApiError(409, "otp doesn't matched")
        }

        // update pasword
        user.password = newPassword; // Assign new password
        const response = await user.save(); 
        // console.log("Password modified?", user.isModified("password")); 
        if(!response){
            throw new ApiError(409, "password does not update - error")
        }

        // access and refresh token
        const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id, true)
        
        const loggedInUser = await User.findById(user._id).
        select("-password -refreshToken")

        return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {   // when we set token in cookies,
                    // what is the need of sending it in json format??
                    // may be user want to save it in localstorage (not good practice)
                    // may be use in native mobile apps (as we can't set cookies in native mobile apps) 
                    user: loggedInUser,
                    accessToken,
                    refreshToken
                },
                "Password updated successfully"
            )
        )
    }
})

const changeCurrentPassword = asyncHandler(async (req, res) => {
    const { oldPassword, newPassword } = req.body
    const user = await User.findById(req.user?._id)
    const isOldPasswordCorrect = await user.isPasswordCorrect(oldPassword)

    if (!isOldPasswordCorrect) {
        throw new ApiError(400, "Invalid Old Password")
    }

    user.password = newPassword  // save hone se pehle se [userSchema.pre("save",) in user.model.js] wala hook chlega
    await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(new ApiResponse(200, {}, "Passoword Changed Successfully"))
})

const getCurrentUser = asyncHandler(async (req, res) => {

    const user = req?.user;
    console.log(user)
    if(!user){
        throw new ApiError(410, "", "User not found")
    } else{
        return res
        .status(200)
        .json(new ApiResponse(200, req.user, "current user fetched Successfully"))
    }

})

const updateAccountDetails = asyncHandler(async (req, res) => {
    const { fullName, email } = req.body

    if (!fullName || !email) {
        throw new ApiError(400, "All fields are required")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {
                fullName,   // fullName: fullName
                email       // email: email
            }
        },
        { new: true } // update hone k baad jo information h wo return ho
    ).select("-password")

    return res
        .status(200)
        .json(new ApiResponse(200, user, "Account details updated successfully"))
})

const updateUserAvatar = asyncHandler(async (req, res) => {
    const newAvatarLocalPath = req.file?.path

    if (!newAvatarLocalPath) {
        throw new ApiError(400, "Avatar file is missing")
    }

    const newAvatar = await uploadOnCloudinary(newAvatarLocalPath)
    if (!newAvatar.url) {
        throw new ApiError(400, "Error while updating user avatar")
    }

    // const user = await User.findByIdAndUpdate(
    //     req.user?.id,
    //     {
    //         $set: {
    //             avatar: newAvatar.url
    //         }
    //     },
    //     {new: true}
    // )

    // Delete old avatar Image from cloudinary
    const user = req.user // NOTE: (middleware)verifyJWT append user to req 
    if (!user) {
        throw new ApiError(400, "user not found from request while updating avatar image")
    }

    const oldAvatarUrl = user?.avatar; // store old url
    if (!oldAvatarUrl) {
        throw new ApiError(400, "oldAvatarUrl not found")
    }
    const oldAvatarPublicId = oldAvatarUrl?.split('/upload/')[1].split('/')[1].split('.')[0];
    await deleteFromCloudinary(oldAvatarPublicId) // delete old Avatar from cloudinary

    user.avatar = newAvatar.url // update old url with new one
    const updatedUser = await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "avatar Image updated Successfully")
        )
})

const updateUserCoverImage = asyncHandler(async (req, res) => {
    const coverImageLocalPath = req.file?.path

    if (!coverImageLocalPath) {
        throw new ApiError(400, "CoverImage is missing")
    }

    const newCoverImage = await uploadOnCloudinary(coverImageLocalPath)

    if (!newCoverImage.url) {
        throw new ApiError(400, "Error while updating user CoverImage")
    }

    // const user = await User.findByIdAndUpdate(
    //     req.user?._id,
    //     {
    //         $set: {
    //             coverImage: coverImage.url
    //         }
    //     },
    //     { new: true }
    // )

    // Delete old cover Image from cloudinary
    const user = req.user // NOTE: (middleware)verifyJWT append user to req 
    if (!user) {
        throw new ApiError(400, "user not found from request while updating avatar image")
    }
    
    const oldCoverImageUrl = user?.coverImage; // store old url
    if(oldCoverImageUrl){
        const oldCoverImagePublicId = oldCoverImageUrl?.split('/upload/')[1].split('/')[1].split('.')[0];
        await deleteFromCloudinary(oldCoverImagePublicId) // delete old Avatar from cloudinary
    }
    user.coverImage = newCoverImage.url // update old url with new one
    const updatedUser = await user.save({ validateBeforeSave: false })

    return res
        .status(200)
        .json(
            new ApiResponse(200, updatedUser, "CoverImage updated Successfully")
        )
})

const getUserChannelProfile = asyncHandler(async (req, res) => {
    const { username } = req.params
    if (!username) {
        throw new ApiError(400, "username is missing")
    }

    const channel = await User.aggregate([
        {
            $match: {
                username: username?.toLowerCase()
            }
        },
        {
            $lookup: { // to find subscribers (use channel)
                from: "subscriptions",
                localField: "_id",
                foreignField: "channel",
                as: "subscribers"
            }
        },
        {
            $lookup: { // to find channel(use subscribers), which user is subscribedto
                from: "subscriptions",
                localField: "_id",
                foreignField: "subscriber",
                as: "subscribedTo"
            }
        },
        {
            $addFields: {
                subscribersCount: {
                    $size: "$subscribers"
                },
                channelSubscribedToCount: {
                    $size: "$subscribedTo"
                },
                isSubscribed: {
                    $cond: {
                        if: { $in: [req.user?._id, "$subscribers.subscriber"] },
                        then: true,
                        else: false
                    }
                }
            }
        },
        {
            $project: {
                fullName: 1,
                username: 1,
                subscribersCount: 1,
                channelSubscribedToCount: 1,
                isSubscribed: 1,
                avatar: 1,
                coverImage: 1,
                email: 1
            }
        }
    ])

    if (!channel?.length) {
        throw new ApiError(400, "channel does not exist")
    }
    
    return res
        .status(200)
        .json(
            new ApiResponse(200, channel[0], "User channel fetched Successfully                   ")
        )
})

const getWatchHistory = asyncHandler(async (req, res) => {
    const user = await User.aggregate([
        {
            $match: {
                _id: new mongoose.Types.ObjectId(req.user._id) // // NOTE: manually pass id as objectId
            }
        },
        {
            $lookup: { 
                from: "videos",
                localField: "watchHistory",
                foreignField: "_id",
                as: "watchHistory",
                pipeline: [  // NOTE: subPipeline
                    {
                        $lookup: {
                            from: "users",
                            localField: "owner",
                            foreignField: "_id",
                            as: "owner",
                            pipeline: [ // NOTE: subPipeline
                                {
                                    $project: {
                                        fullName: 1,
                                        // username: 1,
                                        avatar: 1
                                    }
                                }
                            ]
                        }
                    },
                    {
                        $addFields: {
                            owner: {
                                $first: "$owner"
                            }
                        }
                    }
                ]         
            }
        }
    ])

    return res.
    status(200)
    .json(
        new ApiResponse(
            200,
            user[0].watchHistory,
            "Watch History fetched Successfully"
        )
    )
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    forgotPassword,
    getCurrentUser,
    updateAccountDetails,
    updateUserAvatar,
    updateUserCoverImage,
    getUserChannelProfile,
    getWatchHistory,
    SignUp,
    resendOtp,
    verifyEmail,
    uploadProfileImages
}