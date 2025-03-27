import mongoose, { Schema } from "mongoose";

const watchHistorySchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    videoId: {
        type: Schema.Types.ObjectId,
        ref: "Video",
        required: true
    },
    watchTime: { 
        type: Number, 
        default: 0 
    }, // Total watch time in seconds
    lastWatchedPosition: { 
        type: Number, 
        default: 0 
    }, // Last watched position (for resume feature)
    completed: { 
        type: Boolean, 
        default: false 
    }, // Whether video is fully watched
    watchCount: { 
        type: Number, 
        default: 0 
    }, // How many times user watched this video
    watchedAt: { 
        type: Date, 
        default: Date.now 
    },
})

// Compound index for faster lookups
watchHistorySchema.index({ userId: 1, videoId: 1 }, { unique: true });
export const WatchHistory = mongoose.model("WatchHistory", watchHistorySchema)