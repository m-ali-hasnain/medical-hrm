import mongoose from 'mongoose';
const DoctorSchema = mongoose.Schema({
  userId: {type: mongoose.Types.ObjectId, ref: 'User', required: true},
  patients: [{type: mongoose.Types.ObjectId, ref: 'Patient'}]
},{
  timestamps: true
});
export default mongoose.model('Doctor', DoctorSchema);
