import { Router } from "express";
import { createUser, loginUser } from "../controllers/users.controller.js";

const router = Router()

// router.route(createUser).post("/register")
router.route("/register").post(createUser);
router.route("/login").post(loginUser)

export default router;