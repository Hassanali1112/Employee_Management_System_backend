import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv"
dotenv.config({
  path : "./.env"
})
const app = express();

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());


// employee_management_system;

// user route import
import userRouter from "./routes/users.route.js"
import addEmployeeRouter from "./routes/addEmployee.route.js"

// user route declaration
app.use("/api/v1/users/auth", userRouter)
app.use("/api/v1/admin", addEmployeeRouter)

// 


export {app}