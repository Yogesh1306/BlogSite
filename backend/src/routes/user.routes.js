import {Router} from "express"
import { changePassword, changeProfilePic, changeUsername, deleteUser, getCurrentUser, googleLogin, userLogin, userlogout, userRegister } from "../controllers/user.controllers.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin);
router.route("/google").post(googleLogin);

//secure routes
router.route("/").get(jwtAuth, getCurrentUser)
router.route("/logout").post(jwtAuth,userlogout);
router.route("/updatePassword").patch(jwtAuth,changePassword);
router.route("/updateUsername").patch(jwtAuth,changeUsername);
router.route("/updateProfilePic").patch(jwtAuth,upload.single("profilePic"),changeProfilePic);
router.route("/removeUser").delete(jwtAuth, deleteUser)





export default router