import mongoose from 'mongoose';
const PatientSchema = mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  doctors: [{type: mongoose.Types.ObjectId, ref: 'Doctor'}],
  recordings: [{type: mongoose.Types.ObjectId, ref: 'Recording'}],
},{
  timestamps: true
});
export default mongoose.model('Patient', PatientSchema);
