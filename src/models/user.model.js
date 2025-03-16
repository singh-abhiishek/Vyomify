import mongoose, {Schema} from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt"

const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            lowercase: true,
            trim: true, //Removes any leading or trailing whitespace from the value before storing it.
            index: true // searching field enable krne ke liye, mongodb m jis chij ko hm jyada search krne wale hai usko index: true kr do(taki thora optimise way m search hone lge), it is expensive use it properly
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
            required: true,
            trim: true,
            index: true
        }, 
        avatar: {
            type: String, //cloudanry URL
            // required: true
        },
        coverImage: {
            type: String, //cloudanry URL
        },
        watchHistory: [
            {
                type: Schema.Types.ObjectId,
                ref: "video"
            }
        ],
        password: {
            type: String,
            required: [true, 'password is required'] // custom error message
        },
        refreshToken: {
            type: String
        }
    },
    {
        timestamps: true
    }                   
)

// password encryption using bcrypt, 
// there may be problem if we write call back function after save because in call back we have no reference of this. so that we use normal function

// pre hook, save hone se just pehle function k andr wala kaam kr do    
userSchema.pre("save", async function (next) { 
    if(!this.isModified("password")) return next(); // agr password field modified ho tbhi usko hash kro 
    // bina if condition ke user me kuch bhi uupdate hone pe baar baar password ko hash kr ke change krega
    const isBcryptHash = /^\$2[aby]\$\d{2}\$.{53}$/.test(this.password);
    if(!isBcryptHash) this.password = await bcrypt.hash(this.password, 10)
    next();
})

// compare plain-text password provided during login (or any authentication process) with the hashed password stored in the database.
userSchema.methods.isPasswordCorrect = async function(password){
    return await bcrypt.compare(password, this.password)
}

userSchema.methods.generateAccessToken = function(){
    return jwt.sign(
        {   // ye sari information mongodb se milegi, iske paas uska access hai
            // key-> payload ka naam hai
            // value-> database se aarhi hai
            _id: this._id, 
            email: this.email,
            username: this.username, 
            fullName: this.fullName 
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: process.env.ACCESS_TOKEN_EXPIRY
        }
    )
}

userSchema.methods.generateRefreshToken = function(){
    return jwt.sign(
        {
            _id: this._id,
        },
        process.env.REFRESH_TOKEN_SECRET,
        {
            expiresIn: process.env.REFRESH_TOKEN_EXPIRY
        }
    )
}

export const User = mongoose.model("User", userSchema)