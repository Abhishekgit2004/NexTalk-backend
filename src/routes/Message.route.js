import { Router } from "express";
import { authantication } from "../middleWare/auth.middelware.js";
import { getMassage, messageContainer } from "../controller/messageController.js";


const router=Router()

 router.route("/send/:receiverId").post(authantication,messageContainer)
 router.route("/getmessage/:otherUserId").get(authantication,getMassage)

 export default router