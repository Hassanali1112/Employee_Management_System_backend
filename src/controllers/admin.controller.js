import {AddEmployee} from "../models/addEmployee.model.js"
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js"

export const addEmployee = asyncHandler( async(req, res)=>{
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