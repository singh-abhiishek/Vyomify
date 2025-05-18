import mongoose, { Schema } from "mongoose";

const tweetSchema = new Schema(
    {//TODO: add field for image
        content: {
            type: String,
            required: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        },
        tweetFile: {   // image type
            type: String, //cloudinary url
        },  
        isPublished: {
            type: Boolean,
            default: false 
        }, 
    },
    { timestamps: true }
)

export const Tweet = mongoose.model("Tweet", tweetSchema)