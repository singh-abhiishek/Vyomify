import { Router } from 'express';
import {
    getLatestVideosFromSubscribedChannels,
    getSubscribedChannels,
    getSubscriptionStatus,
    getUserChannelSubscribers,
    toggleSubscription,
} from "../controllers/subscription.controller.js"
import {verifyJWT} from "../middlewares/auth.middleware.js"

const router = Router();
router.use(verifyJWT); // Apply verifyJWT middleware to all routes in this file

router
    .route("/c/:channelId")
    .get(getUserChannelSubscribers)
    .post(toggleSubscription);

router.route("/c/status/:channelId").get(getSubscriptionStatus)

router.route("/u/:subscriberId").get(getSubscribedChannels);
router.route("/u/latest/:subscriberId").get(getLatestVideosFromSubscribedChannels); 

export default router