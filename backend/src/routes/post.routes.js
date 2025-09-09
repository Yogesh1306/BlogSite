import { Router } from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, updatePost, getAllPosts, getAPost } from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/").post(jwtAuth,upload.single("photo"), createPost);
router.route("/").get(getAllPosts);
router.route("/:id").get(getAPost);
router.route("/:id").put(jwtAuth, updatePost);
router.route("/:id").delete(jwtAuth, deletePost);

export default router;