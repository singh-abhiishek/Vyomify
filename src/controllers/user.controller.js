import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import jwt from "jsonwebtoken"
import mongoose from "mongoose";

const options = {
    httpOnly: true,
    secure: true
}

const generateAccessAndRefreshToken = async (userId) => {
    try {
        const user = await User.findById(userId)
        const accessToken = user.generateAccessToken()
        const refreshToken = user.generateRefreshToken()

        // add refreshToken in user
        user.refreshToken = refreshToken

        // save user
        await user.save({ validateBeforeSave: false})
        return {accessToken, refreshToken}
    } catch (error) {
        console.log("console:",error);
        
        // throw new ApiError(500, error.message)
        throw new ApiError(500, "something went wrong while generating refresh and access token")
    }
}

const registerUser = asyncHandler( async (req, res) => {

    //********** get users detail from frontend *********//
    const {username, email, fullName, password} = req.body // req.body is an object

    // ********* validation - isEmpty? *********//

    // if(fullName === ""){
    //     throw new ApiError(400, "fullname is required")
    // }    

                // OR
    if(
        [fullName, email, username, password].some( (field) => 
        field?.trim() === "" )
    ){
        throw new ApiError(400, "All fields are required")
    }

    if(!email.includes("@")) {
        throw new ApiError(400, "Invalid email")
    }

    //********** check if users already exists: username, email *********//
    const isUserExisted = await User.findOne({
        $or: [ { username }, { email } ]
    })

    if(isUserExisted){
        throw new ApiError(409, "user with email or username already existed")
    }

    //********** take coverImage and avatar local path from multer & check for avatar(required) **********//
    const avatarLocalPath = req.files?.avatar[0]?.path;
    // const coverImageLocalPath = req.files?.coverImage[0]?.path;

    let coverImageLocalPath;
    if(req.files && Array.isArray(req.files.coverImage) && req.files.coverImage.length > 0){
        coverImageLocalPath = req.files.coverImage[0].path
    }

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }

    //********** upload them to cloudinary **********//
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    let coverImage;
    if(coverImageLocalPath){
        coverImage = await uploadOnCloudinary(coverImageLocalPath)
    }

    if(!avatar){ // required field, compulsory to check
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
    if(!createdUser){
        throw new ApiError(500, "something went wrong while registering the user")
    }

    //********** return response **********//
    return res.status(201).json(
        new ApiResponse(200, createdUser, "User Registered Successfully!")
    )
}) 

const loginUser = asyncHandler(async(req, res) => {

    // take data from req body
    const {email, username, password} = req.body;

    // username or email
    if(!username && !email){
        throw new ApiError(400, "username or email is required");
    }

    // find the user
    const user = await User.findOne({
        $or: [{username}, {email}]
    })
    
    if(!user){
        throw new ApiError(404, "User does not exist");
    }

    // password check
    const isPasswordValid = await user.isPasswordCorrect(password)

    if(!isPasswordValid){
        throw new ApiError(401, "Invalid user Credentials");
    }

    // access and refresh token
    const { accessToken, refreshToken } = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).
    select("-password -refreshToken")

    // send cookie
    // const options = {
    //     httpOnly: true,
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
                // may be user want to save it in locatstorage (not good practice)
                // may be use in native mobile apps (as we can't set cookies in native mobile apps) 
                user: loggedInUser, 
                accessToken, 
                refreshToken
            },
            "User Logged In Successfully"
        )
    )
})

const logoutUser = asyncHandler(async(req, res) => {
    await User.findOneAndUpdate(
        req.user._id,
        {
            refreshToken: undefined
        },
        {
            // The new option tells Mongoose to return the updated document instead of the old one 
            new: true
        }
    )

    // const options = {
    //     httpOnly: true,
    //     secure: true
    // }

    return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options) 
    .json(
        new ApiResponse(
            200, {}, "User Logged Out Successfully"
        )
    )
})

const refreshAccessToken = asyncHandler(async(req, res) => {
    try {
        const incomingRefreshToken = req.cookies.refreshToken || req.body.refreshToken
    
        if(!incomingRefreshToken){
            throw new ApiError(401, "Unauthorizes request")
        }
    
        const decodedRefreshToken = jwt.verify(
            incomingRefreshToken, 
            process.env.REFRESH_TOKEN_SECRET
        )
    
        const user = await User.findById(decodedRefreshToken?._id)
    
        if(!user){
            throw new ApiError(401, "Invalid refresh token")
        }
    
        if(incomingRefreshToken !== user?.refreshToken){
            throw new ApiError(401, "refresh token is expired or used")
        }
    
        const {newAccessToken, newRefreshToken} = await generateAccessAndRefreshToken(user._id)
    
        return res
        .status(200)
        .cookie("accessToken", newAccessToken, options)
        .cookie("refreshToken", newRefreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    accessToken: newAccessToken,
                    refreshToken: newRefreshToken
                },
                "access and refresh token refreshed"
            )
        )
    } catch (error) {
        throw new ApiError(401, error?.message || "Invalid Refresh Token")
    }
})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken
}