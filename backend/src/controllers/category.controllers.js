import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Category } from "../models/category.model.js";

const createCategories = asyncHandler(async (req, res) => {
  const { names } = req.body;

  if (!names || (Array.isArray(names) && names.length === 0)) {
    throw new ApiError(400, "Category names are required");
  }

  const categoryArray = Array.isArray(names) ? names : [names];

  const existingCategories = await Category.findOne({
    name: { $in: categoryArray },
  });

  if (existingCategories.length > 0) {
    const existingNames = existingCategories.map((c) => c.name);
    throw new ApiError(
      400,
      `These categories already exist: ${existingNames.join(", ")}`
    );
  }

  const createdCategory = await Category.insertMany(
    categoryArray.map((name) => ({ name }))
  );

  if (!createdCategory) {
    throw new ApiError(500, "Error creating the category");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, createdCategory, "Category created successfully")
    );
});

const getCategories = asyncHandler(async (req, res) => {
  const categories = await Category.find().sort({name:1});

  if (!categories || categories.length === 0) {
    throw new ApiError(400, "No categories available");
  }

  return res
    .status(200)
    .json(
      new ApiResponse(200, categories, "categories retrieved successfully")
    );
});

export { createCategories, getCategories };
