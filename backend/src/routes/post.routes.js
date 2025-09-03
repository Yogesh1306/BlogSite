import { Router } from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import { createPost, deletePost, updatePost } from "../controllers/post.controllers.js";

const router = Router();

router.route("/").post(jwtAuth, createPost);
router.route("/:id").put(jwtAuth, updatePost)
router.route("/:id").delete(jwtAuth, deletePost)

export default router;