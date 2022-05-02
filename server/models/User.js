import mongoose from 'mongoose';
const UserModel = mongoose.Schema({
  name: {type: String, required: true},
  email: { type: String, required: true, trim: true, unique: true },
  password: {type: String, required: true},
  role: {type: Number, default: 0},
},{
  timestamps: true
});
export default mongoose.model('User', UserModel);
