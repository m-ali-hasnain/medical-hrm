import doctorController from "../controllers/doctor.js";
import express from "express";
const router = express.Router();
router.get("/patients/:id", doctorController.get_patients);
router.get("/profile/:id", doctorController.get_profile);
export default router;
