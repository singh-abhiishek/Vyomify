import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"

export const verifyJWT = asyncHandler(async(req, res, next) => {
    // async(req, res, next) -> isme res use nhi ho rha hai to kahi-2 pe uski jgh _ likh dete hai -> async(req, _, next)
    try {
        // NOTE: hmne cookies set(login k wqt) kr rkha hai aur uska access cookie-parser k through mil rha hai
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            throw new ApiError(401, "Unauthorized request");
        }
    
        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
    
        const user = await User.findById(decodedToken?._id).
        select("-password -refreshToken")
    
        if (!user) {
            throw new ApiError(401, "Invalid Access Token")
        }
        
        // req m user add kr do
        req.user = user // user ki jgh koi aur bhi name rkh skte hai
        next()
    } catch (error) {
        throw new ApiError(error?.message || "Invalid Access Token")
    }
})