import express from "express";
import paitentController from "../controllers/patient.js";
const router = express.Router();
router.post("/appointment", paitentController.getAppointment);
router.get("/doctors", paitentController.get_all_doctors);
router.get("/doctors/:id", paitentController.get_doctors);
router.get("/profile/:id", paitentController.get_profile);
router.post("/create_recording", paitentController.add_recording);
router.get('/recordings/:id', paitentController.getAllRecordings);
export default router;
