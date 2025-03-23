import mongoose, { Schema } from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const tempUserSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            lowercase: true,
            trim: true, 
        },
        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true,
        },
        fullName: {
            type: String,
            trim: true,
            index: true
        },
        password: {
            type: String,
        },
        otp: {
            type: Number,
            required: true
        },
        otpExpiresAt: {
            type: Date,
            default: Date.now(),
            expires: 120 // two minute m expires ho jayega 
        }
    }
)

tempUserSchema.pre("save", async function (next) { 
    if(!this.isModified("password")) return next(); // agr password field modified ho tbhi usko hash kro 
    // bina if condition ke user me kuch bhi update hone pe baar baar password ko hash kr ke change krega
    
    this.password = await bcrypt.hash(this.password, 10)
    next();
})

tempUserSchema.methods.generateTemporaryToken = function(){
    return jwt.sign(
        {   // ye sari information mongodb se milegi, iske paas uska access hai
            // key-> payload ka naam hai
            // value-> database se aarhi hai
            _id: this._id
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

export const TempUser = mongoose.model("TempUser", tempUserSchema)