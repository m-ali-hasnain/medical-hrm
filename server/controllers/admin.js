import Doctor from '../models/Doctor.js';
import Patient from '../models/Patient.js';
import User from '../models/User.js';
const all_doctors = async (req, res) => {
  try{
    const doctors = await Doctor.find({}).populate('userId');
    res.status(200).json(doctors);
  }
  catch(err){
    res.status(400).json({msg: err.message});
  }
}

const create_doctor = async (req, res)=>{
  try{
    console.log(req.body);
    const user = new User(req.body);
    const userSaved = await user.save();
    const doctor = new Doctor({userId: user._id});
    const doctorSaved = await doctor.save();
    res.status(200).json(await Doctor.findOne({userId: user._id}).populate('userId'));
  }
  catch(err){
    res.status(400).json({msg: err.message})
  }
}

const all_patients = async (req, res) => {
  try{
    const patients = await Patient.find({}).populate('userId');
    res.status(200).json(patients);
  }
  catch(err){
    res.status(400).json({msg: error.message});
  }
}

const create_patient = async (req, res)=>{
  try{

    const user = new User(req.body);
    const userSaved = await user.save();
    const patient = new Patient({userId: user._id});
    const patientSaved = await patient.save();
    res.status(200).json(await Patient.findOne({userId: user._id}).populate('userId'));
  }
  catch(err){
    res.status(400).json({msg: err.message})
  }
}
const update = async (req, res) => {
  try {
    const {name, email, password} = req.body;
    if(!name || !email || !password){
      return new Error('Please Fill out all the fields');
    }
    await User.findByIdAndUpdate(req.params.id,
      {name: name,
      email: email,
      password: password}
      );
    res.status(200).json({msg: "Updated Successfully"});
  } catch (error) {
    res.status(503).json({msg: error.message})
  }
}
const delete_user = async (req, res) => {
  try {
      if (req.params.id){
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({msg: "deleted successfully"});
      }
  } catch (error) {
    res.status(400).json({msg: "failed to delete"});
  }
}
export default {
  all_doctors,
  all_patients,
  create_doctor,
  create_patient,
  update,
  delete_user
}
