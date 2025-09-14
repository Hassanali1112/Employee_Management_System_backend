import { Router } from "express";
import { addEmployee } from "../controllers/admin.controller.js";

const router = Router()

router.route("/add-employee").post(addEmployee);

export default router;