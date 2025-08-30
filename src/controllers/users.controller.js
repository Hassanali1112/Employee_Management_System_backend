import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// options
const options = {
  httpOnly: true,
  secure: true,
};

// generate tokens
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Something went wrong while generating tokens");
  }
};

export const createUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  if ([name, email, password].some((field) => field === "")) {
    throw new ApiError(401, "All fields are required");
  }

  console.log("validation done");

  const userFound = await User.findOne({ email });

  if (userFound) {
    throw new ApiError(400, "User with this email already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
  });

  console.log("user done");

  const createdUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  if (!createdUser) {
    throw new ApiError(500, "Something went wrong while user creation");
  }
  console.log("done");
  return res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User created successfully!"));
});

// login controller
export const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const foundUser = await User.findOne({ email });

  if (!foundUser) {
    throw new ApiError(404, "User with this email not found");
  }

  const isPasswordValid = await foundUser.validatePassword(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    foundUser._id
  );

  const loggedInUser = await User.findById(foundUser._id).select(
    "-password -refreshToken"
  );

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "User logged in successfully"));
   
});


// get user controller
export const getUser = asyncHandler( async (req, res)=>{
  const user = req.user
  return res.status(200)
  .json( new ApiResponse(200, user, "User fetched successfully"))

})

// logout controller
export const logoutUser = asyncHandler( async (req, res)=>{
  
    console.log("110 user :", req.user);
  

  const user = await User.findByIdAndUpdate(
     req.user._id,
     {
       $unset: {
         refreshToken: 1, // this removes the field from document
       },
     },
     {
       new: true,
     }
   );

   return res.status(200)
   .clearCookie("accessToken", options)
   .clearCookie("refreshToken", options)
   .json(new ApiResponse(200, {},"User logged out"))

})