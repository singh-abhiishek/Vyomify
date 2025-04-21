import { Router } from 'express';
import {
    addToWatchLater,
    addVideoToPlaylist,
    createPlaylist,
    deletePlaylist,
    getAllWatchLaterVideos,
    getPlaylistById,
    getUserPlaylists,
    getUserPlaylistsName,
    isVideoAlreadyInWatchLater,
    removeFromWatchLater,
    removeVideoFromPlaylist,
    updatePlaylist,
} from "../controllers/playlist.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();

router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router.route("/").post(createPlaylist)

router
    .route("/:playlistId")
    .get(getPlaylistById)
    .patch(updatePlaylist)
    .delete(deletePlaylist);

router.route("/add/:videoId/").patch(addVideoToPlaylist);

router.route("/u/watchLater").get(getAllWatchLaterVideos);
router.route("/add/watchLater/:videoId/").patch(addToWatchLater);
router.route("/remove/watchLater/:videoId/").patch(removeFromWatchLater);
router.route("/check/watchLater/:videoId/").get(isVideoAlreadyInWatchLater);

router.route("/remove/:videoId/:playlistId").patch(removeVideoFromPlaylist);

router.route("/user/:userId").get(getUserPlaylists);
router.route("/user/:userId/playlistsName").get(getUserPlaylistsName);

export default router