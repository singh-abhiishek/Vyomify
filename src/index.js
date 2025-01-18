import dotenv from "dotenv"
import connectDB from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path: './env'
})

connectDB()
.then(() => {
    app.on("error", (err) => {
        console.log("ERROR before Listen", err)
    })
    app.listen(process.env.PORT || 8000, () => {
        console.log("Server is running at PORT: ", process.env.PORT);
    })
})
.catch((err) => {
    console.log("MONGODB Connection failed!!!", err)
})


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