import mongoose from 'mongoose';
const AppointmentSchema = mongoose.Schema({
  doctorId: {type: mongoose.Types.ObjectId, ref: 'Doctor', required: true},
  patientId: {type: mongoose.Types.ObjectId, ref: 'Patient', required: true}
},{
  timestamps: true
});
export default mongoose.model('Appointment', AppointmentSchema);
