import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js"
import { Category } from "../models/category.model.js"

const createPost = asyncHandler( async(req,res)=>{
    const {title, content, category} = req.body;

    if(!title || !content){
        throw new ApiError(400, "Missing required fields!!")
    }

    const photo = req.file?.path || " ";
    const author = req.user?._id;

    // category should be array of names
    if(!Array.isArray(category) || category.length === 0){
        throw new ApiError(400, "At least one category is required")
    }

    // Find categories by names
    const categories = await Category.find({name: {$in: category}});

    if(categories.length !== category.length){
        throw new ApiError(400, "One or more categories are invalid")
    }

    // Extract category IDs
    const categoryIds = categories.map(cat => cat._id);

    const newPost = await Post.create({
        title,
        content,
        photo,
        author,
        category: categoryIds || " "
    });

    // const createdPost = await Post.findById(newPost._id);
    const createdPost = await Post.findById(newPost._id)
    .populate("author", "username email")
    .populate("category", "name");

    if(!createdPost){
        throw new ApiError(400, "Error creating the post")
    }

    return res.status(200).json(new ApiResponse(200, createdPost, "Post created successfully"));
});

const updatePost = asyncHandler( async(req,res)=>{
    const postId = req.params?.id;
    const {title, content} = req.body;

    const existedPost = await Post.findById(postId);

    if(!existedPost){
        throw new ApiError(400, "No such post exist")
    }

    const updatedPost = await Post.findByIdAndUpdate(
        postId,
        {
            $set:{title,content}
        },
        {
            new: true
        }
    ).populate("author", "username email")
    .populate("category", "name");

    return res.status(200).json(new ApiResponse(200, updatedPost, "Post updated successfully"))
});

const deletePost = asyncHandler( async(req,res)=>{

});

const getAllPosts = asyncHandler( async(req,res)=>{

}) 

export {
    createPost,
    updatePost,
    deletePost,
}