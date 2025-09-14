import mongoose, { Schema } from "mongoose";

const addEmployeeSchema = new Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    cnic: { type: Number, required: true, unique: true },
    contactNo: { type: Number, required: true, unique: true },
    qualification: { type: String, required: true },
    position: { type: String, required: true },
    joiningDate: { type: String, required: true },
    salary: { type: Number, required: true },
    address: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const AddEmployee = mongoose.model("AddEmployee", addEmployeeSchema);

// fullName,
//     cnic,
//     email,
//     contactNo,
//     dob,
//     qualification,
//     position,
//     joiningDate,
//     salary,
//     address,
