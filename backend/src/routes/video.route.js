import { Router } from 'express';
import {
    deleteVideo,
    getAllVideos,
    getAllVideosPublishedByUser,
    getVideoById,
    getVideosAndChannelBasedOnSearch,
    publishAVideo,
    togglePublishStatus,
    updateVideoDetails,
    updateVideoThumbnail,
} from "../controllers/video.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"
import {upload} from "../middlewares/multer.middleware.js"

const router = Router();
router.use(verifyJWT) // Apply verifyJWT middleware to all routes in this file

router
    .route("/")
    .get(getAllVideos)
    .post(
        upload.fields([
            {
                name: "videoFile",
                maxCount: 1,
            },
            {
                name: "thumbnail",
                maxCount: 1,
            },
            
        ]),
        publishAVideo
    );

router.route("/search-video").get(getVideosAndChannelBasedOnSearch)
router.route("/published-Video/:userId").get(getAllVideosPublishedByUser)

router
    .route("/:videoId")
    .get(getVideoById)
    .delete(deleteVideo)
    .patch(updateVideoDetails)

router
    .route("/update-thumbnail/:videoId")
    .patch(upload.single("thumbnail"), updateVideoThumbnail);

router
    .route("/toggle/publish/:videoId")
    .patch(togglePublishStatus); 

export default router