import {AddEmployee} from "../models/addEmployee.model.js"
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"

export const addEmployee = asyncHandler( async(req, res)=>{
  const isAdmin = await User.findById(req.user._id).select("-password -refreshToken")

  console.log("admin : ",isAdmin.role)

  if(isAdmin.role !== "admin"){
    throw new ApiError(401, "Unauthorized to add employee")
  }

  const {
    fullName,
    cnic,
    email,
    contactNo,
    dob,
    qualification,
    position,
    joiningDate,
    salary,
    address,
  } = req.body;

  if([fullName,
    cnic,
    email,
    contactNo,
    dob,
    qualification,
    position,
    joiningDate,
    salary,
    address].some((field) => field === "")){
      throw new ApiError(401, "All fields are required")
    }
    res.status(201).json(req.body)
})