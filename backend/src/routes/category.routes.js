import {Router} from "express";
import { createCategories, getCategories } from "../controllers/category.controllers.js";

const router = Router();

router.route("/").post(createCategories)
router.route("/").get(getCategories)

export default router