import { Router } from "express";
import { jwtAuth } from "../middlewares/auth.middleware.js";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
  getAPost,
  searchByTitle,
} from "../controllers/post.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/searchByTitle").get(searchByTitle);
router
  .route("/")
  .get(getAllPosts)
  .post(jwtAuth, upload.single("photo"), createPost);
router
  .route("/:id")
  .get(getAPost)
  .put(jwtAuth, updatePost)
  .delete(jwtAuth, deletePost);

export default router;
