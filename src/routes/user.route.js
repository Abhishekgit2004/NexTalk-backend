import { Router } from "express";

import { getOtherUser, getProfile, Login, Logout, register } from "../controller/user.controller.js";
import { upload } from "../middleWare/multer.middleware.js";
import { authantication } from "../middleWare/auth.middelware.js";
import { messageContainer } from "../controller/messageController.js";

const router=Router()

router.route("/login").post(Login)

router.route("/register").post(
  
      upload.fields([{
        name:"avatar",
        maxCount:1
    },
   ])
   , register)

    router.route("/get-profile").get(authantication, getProfile)
    router.route("/getothers").get(authantication,getOtherUser)
    router.route("/logout").post(authantication, Logout)
   

export default router;

