import {v2 as cloudinary} from "cloudinary"
import fs from "fs";  // file system (nodejs k saath default aata hai)
import { ApiError } from "./ApiError.js";

// Configuration
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET 
});

const uploadOnCloudinary = async (localFilePath) => {
    try {
        if(!localFilePath){
            throw new Error("localFilePath is not found");
            // return null
        }
        //upload the file on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "auto" 
        })
        
        //file has been uploaded successfully
        console.log("file is uploaded on cloudinary", response.url)

        fs.unlinkSync(localFilePath)
        return response;

    } catch (error) {
        //remove the locally saved temporary file as the uploaded operation got failed
        fs.unlinkSync(localFilePath) 
        return null;
    }
}

const deleteFromCloudinary = async(oldAvatarPublicId) => {
    try {
        if(!oldAvatarPublicId){
            throw new ApiError("oldAvatarPublicId is not found");
        }
        const response = await cloudinary.uploader.destroy(oldAvatarPublicId, { invalidate: true });
        return response;
        
    } catch (error) {
        throw new ApiError(500, error?.message || "Error while deleting file from cloudinary")
    }
}

export {
    uploadOnCloudinary,
    deleteFromCloudinary
}