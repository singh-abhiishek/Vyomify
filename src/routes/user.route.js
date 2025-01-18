import {Router} from "express"
// import {registerUser} from "../controllers/user.controller.js"
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { registerUser } from "../controllers/user.controller.js";
 
const router = Router()

router.route("/register").post(registerUser)

export default router 