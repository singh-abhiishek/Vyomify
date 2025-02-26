import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true

    // NOTE: credentials: true in CORS?????:-
    // Allows the server to accept cookies, HTTP authentication headers, or SSL certificates from the frontend.
    // Needed for handling sessions, JWT tokens, or secure logins.
    // Without this, the browser blocks credentials in cross-origin requests.
    // Must pair with Access-Control-Allow-Credentials: true on the server response.
    // Example: Login system where the backend sets a cookie for authentication.
}))

app.use(express.json({limit: "16kb"}))
app.use(express.urlencoded({extended: true, limit: "16kb"}))
app.use(express.static("public"))
app.use(cookieParser())

// routes import
import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"

// routes declaration

// http://localhost:8000/api/v1/users/register
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)






// Error-Handler Middleware
app.use((err, req, res, next) => {
    res.status(err.statusCode || 500).json({
        success: false,
        message: err.message || "Internal Server Error",
        errors: err.errors || [],
        data: null,
    });
});

export { app }