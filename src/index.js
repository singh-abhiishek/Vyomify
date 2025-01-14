import dotenv from "dotenv"
import connectDB from "./db/index.js"

dotenv.config({
    path: './env'
})

connectDB()


//**************1st approach***************//

/*
import mongoose from "mongoose";
import { DB_NAME } from "./constants";

import express from "express";
const app = express()

(async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`)

        //This listens for the "error" event on the app object.
        app.on("error", (error) => {
            console.log("ERROR: ", error);
            throw error;
        })
            
        app.listen(process.env.PORT, () => {
            console.log(`App is listening on port: ${process.env.PORT}`)
        })
    } catch (error) {
        console.log("ERROR:", error)
        throw error
    }
})()
*/