import mongoose, {Schema} from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema(
    {
        videoFile: {
            type: String, //cloudinary url
            required: true
        },
        thumbnail: {
            type: String, //cloudinary url
            required: true
        },
        title: {
            type: String, 
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: Number, //from cloudinary
            required: true
        },
        views: {
            type: Number,
            default: 0
        },
        isPublished: {
            type: Boolean,
            default: true
        },
        owner: {
            type: Schema.Types.ObjectId,
            ref: "User"
        }
    },
    {
        timestamps: true
    }
)

// Title aur description dono pe index ban gaya — ab MongoDB words ko intelligently match karega!
videoSchema.index({ title: "text", description: "text" });
videoSchema.plugin(mongooseAggregatePaginate); // to write aggregration queries
export const Video = mongoose.model("Video", videoSchema);