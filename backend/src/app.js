import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
    maxAge: 1000 * 60 * 10 ,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],

    // If maxAge is not set, the cookie will expire when the browser session ends (i.e., when the user closes the tab or browser).
    // This ensures that the user remains authenticated for at least 10 minutes without needing to log in again.

    // NOTE: credentials: true in CORS?????:-
    // Allows the server to accept cookies, HTTP authentication headers, or SSL certificates from the frontend.
    // Needed for handling sessions, JWT tokens, or secure logins.
    // Without this, the browser blocks credentials in cross-origin requests.
    // Must pair with Access-Control-Allow-Credentials: true on the server response.
    // Example: Login system where the backend sets a cookie for authentication.
}))

app.use(express.json({ limit: "16kb" }))
app.use(express.urlencoded({ extended: true, limit: "16kb" }))
app.use(express.static("public"))
app.use(cookieParser())



// routes import
import healthRouter from "./routes/healthcheck.route.js"
import userRouter from "./routes/user.route.js"
import videoRouter from "./routes/video.route.js"
import commentRouter from "./routes/comment.route.js"
import tweetRouter from "./routes/tweet.route.js"
import likeRouter from "./routes/like.route.js"
import playlistRouter from "./routes/playlist.route.js"
import subscriptionRouter from "./routes/subscription.route.js"
import dashboardRouter from "./routes/dashboard.route.js"

// routes declaration
app.use("/api/v1/healthcheck", healthRouter)
app.use("/api/v1/users", userRouter)
app.use("/api/v1/videos", videoRouter)
app.use("/api/v1/comments", commentRouter)
app.use("/api/v1/tweets", tweetRouter)
app.use("/api/v1/likes", likeRouter)
app.use("/api/v1/playlists", playlistRouter)
app.use("/api/v1/subscriptions", subscriptionRouter)
app.use("/api/v1/dashboards", dashboardRouter)


// http://localhost:8000/api/v1/users/register



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