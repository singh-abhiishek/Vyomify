import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { User } from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.service.js"
import { ApiResponse } from "../utils/ApiResponse.js"

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
    const isUserExisted = User.findOne({
        $or: [ { username }, { email } ]
    })

    if(isUserExisted){
        throw new ApiError(409, "user with email or username already existed")
    }

    //********** take coverImage and avatar local path from multer & check for avatar(required) **********//
    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if(!avatarLocalPath){
        throw new ApiError(400, "avatar file is required")
    }

    //********** upload them to cloudinary **********//
    const avatar = await uploadOnCloudinary(avatarLocalPath)
    const coverImage = await uploadOnCloudinary(coverImageLocalPath)

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

export {registerUser}