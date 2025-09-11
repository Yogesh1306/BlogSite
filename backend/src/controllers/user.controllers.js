import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"
import { Post } from "../models/post.model.js"

const generateAccessAndRefreshToken = async(userId)=>{
    try {
        const user = await User.findById(userId);
        const accessToken = user.generateAccessToken();
        const refreshToken = user.generateRefreshToken();

        user.refreshToken = refreshToken;
        await user.save({validateBeforeSave: false});

        return {accessToken, refreshToken}
    } catch (error) {
        throw new ApiError(500, error?.message || "Something went wrong while generating Access token and Refresh token")
        
    }
}

const userRegister = asyncHandler( async(req,res)=>{

    const {username, email, password} = req.body;

    if(!username &&  !email){
        throw new ApiError(400, "Username or email is required!!")
    }

    const userExist = await User.findOne({
        $or: [{username},{email}]
    })

    if(userExist){
        throw new ApiError(409, "User already Exist!! Please login")
    }
    
    // const profilePicLocalPath = req.file?.path;

    // if(!profilePicLocalPath){
    //     throw new ApiError(400, "Profile pic is required")
    // }

    const user = await User.create({
        username,
        email,
        password,
        // profilePic: profilePicLocalPath || ""
    });

    const createdUser = await User.findById(user._id).select("-password");

    if(!createdUser){
        throw new ApiError(500, "Something went wrong while creating user...")
    }

    return res.status(201).json(new ApiResponse(200, createdUser, "User registered successfully")
    )

})

const userLogin = asyncHandler( async(req,res)=>{
    const {username, email, password} = req.body;

    if(!(username || email)){
        throw new ApiError(400, "Username or email required!!")
    }

    const user = await User.findOne({
        $or: [{username}, {email}]
    })

    if(!user){
        throw new ApiError(400, "username or email doesnot exist")
    }

    const isPasswordCorrect = await user.isPasswordCorrect(password)

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid credentials!!")
    }
    const {accessToken, refreshToken} = await generateAccessAndRefreshToken(user._id)

    const loggedInUser = await User.findById(user._id).select("-password -refreshToken")

    const options = {
        httpOnly: true,
        secure: true
    }

    return res
    .status(200)
    .cookie("AccessToken", accessToken, options)
    .cookie("RefreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"))
})

const userlogout = asyncHandler(async(req,res)=>{
    await User.findByIdAndUpdate(
        req.user._id,
        {
            $set: {refreshToken: null},
        },
        {
            new: true
        }
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {}, "User logged out"))
})

const changePassword = asyncHandler( async( req, res)=>{
    const {oldPassword, newPassword} = req.body;

    const user = await User.findById(req.user?._id);

    const isPasswordCorrect = await user.isPasswordCorrect(oldPassword);

    if(!isPasswordCorrect){
        throw new ApiError(400, "Invalid credentials!!");
    }

    user.password = newPassword;
    await user.save({validateBeforeSave: false});

    return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully"))
})

const changeProfilePic = asyncHandler( async( req, res)=>{
    const profilePicLocalPath = req.file?.path;

    if(!profilePicLocalPath){
        throw new ApiError(400, "Profile pic missing")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {profilePic: profilePicLocalPath}
        },
        {
            new: true
        }
    ).select("-password")

    return res.status(200).json(new ApiResponse(200, user, "Profile pic updated successfully"))
})

const changeUsername = asyncHandler( async( req, res)=>{
    const username = req.body;

    if(!username){
        throw new ApiError(400, "Field is required!!")
    }

    const user = await User.findByIdAndUpdate(
        req.user?._id,
        {
            $set: {username}
        },
        {
            new: true
        }
    ).select("-password");

    return res.status(200).json(new ApiResponse(200, user, "Account details updated successfully"));
})

const deleteUser = asyncHandler(async(req, res)=>{
    const deletedPost = await Post.deleteMany({author: req.user?._id})
    const deletedUser = await User.findByIdAndDelete(
        req.user?._id,
    )

    const options = {
        httpOnly: true,
        secure: true,
    }

    return res
    .status(200)
    .clearCookie("AccessToken", options)
    .clearCookie("RefreshToken", options)
    .json(new ApiResponse(200, {deletedUser, deletedPost}, "User Deleted!!"))
})

const getCurrentUser = asyncHandler(async(req,res)=>{    
    return res.status(200).json(new ApiResponse(200, req.user, "Current user retrieved!!"))
})

export {
    userLogin,
    userRegister,
    userlogout,
    deleteUser,
    getCurrentUser,
    changePassword,
    changeProfilePic,
    changeUsername,
}