import {asyncHandler} from "../utils/asyncHandler.js"
import { ApiError } from "../utils/ApiError.js"
import { ApiResponse } from "../utils/ApiResponse.js"
import { User } from "../models/user.model.js"

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

    const user = await User.create({
        username,
        email,
        password
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

    const loggedInUser = await User.findById(user._id).select("-password")

    return res.status(200).json(new ApiResponse(200, loggedInUser, "User logged in successfully"))
})
const changePassword = asyncHandler( async( req, res)=>{

})
const changeProfilePic = asyncHandler( async( req, res)=>{

})
const changeUsername = asyncHandler( async( req, res)=>{

})
export {
    userLogin,
    userRegister,
    changePassword,
    changeProfilePic,
    changeUsername,
}