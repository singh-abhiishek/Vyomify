import { Router } from 'express';
import {
    createTweet,
    deleteTweet,
    getUserTweets,
    updateTweet,
} from "../controllers/tweet.controller.js"
import { verifyJWT } from "../middlewares/auth.middleware.js"
import { upload } from "../middlewares/multer.middleware.js"


const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

// router
//     .route("/")
//     .post(createTweet);

router.route("/").post(
    upload.fields([   // file handling, multer middleware se hoke jana
        {
            name: "tweetFile",  //NOTE: frontend & backend m ye name(tweetFile) same hona jaruri hai
            maxCount: 1
        },
    ]),
    createTweet)

router
    .route("/user/:userId")
    .get(getUserTweets);

router
    .route("/:tweetId")
    .patch(upload.single("tweetFile"), updateTweet)
    .delete(deleteTweet);

export default router