import { Router } from "express";
import { createUser, getUser, loginUser } from "../controllers/users.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

// router.route(createUser).post("/register")
router.route("/register").post(createUser);
router.route("/login").post(loginUser)

// secured routes

router.route("/get-user").get(verifyJwt, getUser)

export default router;