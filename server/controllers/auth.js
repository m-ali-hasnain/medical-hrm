import User from "../models/User.js"

const authenticate = async (req, res, next) => {
  const user = await User.findOne({email: req.body.email, password: req.body.password});
  if (user == null){
    res.status(404).json({msg: 'Incorrect Email or Password'});
  }else{
    res.status(200).json(user);
  }
}
export default {
  authenticate
}
