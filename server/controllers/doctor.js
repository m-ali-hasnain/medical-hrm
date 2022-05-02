import Doctor from "../models/Doctor.js";
import Patient from "../models/Patient.js";
const get_patients = async (req, res) => {
  try {
    const patients = await Doctor.findOne(
      { _id: req.params.id },
      "patients"
    ).populate({
      path: "patients",
      model: "Patient",
      populate: { path: "userId" },
    });
    res.status(200).json(patients);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const get_profile = async (req, res) => {
  try {
    const doctor = await Doctor.find({ userId: req.params.id });
    res.status(200).json(doctor);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
export default {
  get_patients,
  get_profile,
};
