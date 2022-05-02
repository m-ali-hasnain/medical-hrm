import Appointment from "../models/Appointment.js";
import Patient from "../models/Patient.js";
import Doctor from "../models/Doctor.js";
import User from "../models/User.js";
import Recording from "../models/Recording.js";
const getAppointment = async (req, res) => {
  try {
    console.log(req.body);
    const appointment = new Appointment(req.body);
    await appointment.save();
    await Doctor.findByIdAndUpdate(req.body.doctorId, {
      $push: { patients: req.body.patientId },
    });
    await Patient.findByIdAndUpdate(req.body.patientId, {
      $push: { doctors: req.body.doctorId },
    });
    res
      .status(200)
      .json(
        await Appointment.find({ _id: appointment._id }).populate(
          "doctorId patientId"
        )
      );
  } catch (err) {
    res.status(400).json({ msg: err.message });
  }
};
const get_all_doctors = async (req, res) => {
  try {
    const doctors = await Doctor.find({}).populate({
      path: "userId",
      model: "User",
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};
const get_doctors = async (req, res) => {
  try {
    const doctors = await Patient.findOne(
      { _id: req.params.id },
      "doctors"
    ).populate({
      path: "doctors",
      model: "Doctor",
      populate: { path: "userId" },
    });
    res.status(200).json(doctors);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const get_profile = async (req, res) => {
  try {
    const patient = await Patient.find({ userId: req.params.id });
    res.status(200).json(patient);
  } catch (error) {
    res.status(400).json({ msg: error.message });
  }
};

const add_recording = async (req, res) => {
  try {
      const {blobUrl, patientId} = req.body;
      if(!blobUrl || !patientId){
        res.status(500).json({msg: 'Unable to create recording'});
      }
      const recording = new Recording({blobUrl: blobUrl, patientId: patientId});
      await recording.save();
      const patient = await Patient.findByIdAndUpdate({_id: patientId}, {$push: {recordings: recording._id}});
      res.status(200).json(recording);
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}
const getAllRecordings = async (req, res)=>{
  try {
    if(req.params.id){
      const recordings = await Patient.findById(req.params.id).populate('recordings');
      res.status(200).json(recordings);
    }
    else{
      res.status(500).json({msg: 'Please Provide Patient Id'});
    }
  } catch (error) {
    res.status(500).json({msg: error.message});
  }
}
export default {
  getAppointment,
  get_all_doctors,
  get_doctors,
  get_profile,
  add_recording,
  getAllRecordings
};
