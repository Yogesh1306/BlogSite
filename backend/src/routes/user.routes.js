import {Router} from "express"
import { changePassword, changeProfilePic, changeUsername, deleteUser, getCurrentUser, userLogin, userlogout, userRegister } from "../controllers/user.controllers.js";
import { jwtAuth } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/register").post(userRegister)
router.route("/login").post(userLogin);

//secure routes
router.route("/").get(jwtAuth, getCurrentUser)
router.route("/logout").post(jwtAuth,userlogout);
router.route("/updatePassword").put(jwtAuth,changePassword);
router.route("/updateUsername").put(jwtAuth,changeUsername);
router.route("/updateProfilePic").put(jwtAuth,changeProfilePic);
router.route("/removeUser").delete(jwtAuth, deleteUser)





export default router