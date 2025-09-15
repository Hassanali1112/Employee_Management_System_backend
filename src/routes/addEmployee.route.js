import { Router } from "express";
import { addEmployee } from "../controllers/admin.controller.js";
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router()

router.route("/add-employee").post(verifyJwt,addEmployee);

export default router;