import { AddEmployee } from "../models/addEmployee.model.js";
import { User } from "../models/users.model.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { sendMail } from "../utils/sendMail.utils.js";

export const addEmployee = asyncHandler(async (req, res) => {
  const isAdmin = await User.findById(req.user._id).select(
    "-password -refreshToken"
  );

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
    ].some((field) => field.trim() === "")
  ) {
    throw new ApiError(401, "All fields are required");
  }

  const employeeFound = await AddEmployee.findOne({
    cnic,
  });

  console.log("check employee");

  if (employeeFound) {
    throw new ApiError(409, "Employee with this CNIC already exists");
  }

  const newEmpoloyee = await AddEmployee.create({
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

  if (!newEmpoloyee) {
    throw new ApiError(
      500,
      "Something went wrong while creating adding new emoloyee"
    );
  }
  console.log("added");

  const employeePassword = createPassword()
  const employeeAccount = await User.create({
    name: fullName,
    email: email,
    password: employeePassword,
  });

  console.log("account created employee");

  if (!employeeAccount) {
    throw new ApiError(
      500,
      "Something went wrong while registering new emoloyee"
    );
  }

  console.log("before mail send");

  const mailSent = await sendMail(
    email,
    employeePassword
  );

  console.log("done employee");

  return res.status(201).json(201, "Employee added successfully");
});

const createPassword = () => {
  let passwordCharacter =
    "0123456789abcdefghijklmnopqrstuvwxkzABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*";
  let password = "";
  for (let i = 0; i < 8; i++) {
    let char = Math.round(Math.random() * passwordCharacter.length + 1);
    password += passwordCharacter.charAt(char);
  }
  return password;
};
