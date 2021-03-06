import express from 'express';
import adminController from '../controllers/admin.js';
const router = express.Router();
router.get('/doctors', adminController.all_doctors);
router.post('/doctors', adminController.create_doctor);
router.get('/patients', adminController.all_patients);
router.post('/patients', adminController.create_patient);
router.patch('/update/:id', adminController.update);
router.delete('/delete/:id', adminController.delete_user);
export default router;
