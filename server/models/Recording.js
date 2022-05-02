import mongoose from 'mongoose';
const recordingSchema = mongoose.Schema({
  blobUrl: {type: String, required: true},
  patientId: {type: mongoose.Types.ObjectId, ref:'Patient', required: true}
},{timestamps: true});
export default mongoose.model('Recording', recordingSchema);
