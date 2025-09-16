import { AddEmployee } from "../models/addEmployee.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

export const addEmployee = asyncHandler(async (req, res) => {
  const isAdmin = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

  console.log("admin : ", isAdmin.role);

  if (isAdmin.role !== "admin") {
    throw new ApiError(401, "Unauthorized to add employee");
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

  if (
    [
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
    ].some((field) => field === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const findEmployee = await AddEmployee.findOne({
    $or: [{ email }, { cnic }, { contactNo }],
  });

  if(findEmployee){
    throw new ApiError(404, "Employee with this email, cnic, contact no already exist")
  }

  const newEmployee = await AddEmployee.create({
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
  });

  const employee = await newEmployee.findById(newEmployee._id)

  if(!employee){
    throw new ApiError(501, "Something went wrong while adding employee")
  }

  return res.status(201).json(new ApiResponse(201, "New emploee has been added successfully"))
});
