
import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import adminRouter from './routes/admin.js';
import authRouter from './routes/auth.js';
import bodyParser from 'body-parser';
import appointmentRouter from "./routes/patient.js";
import doctorsRouter from "./routes/doctor.js";
const app = express();
app.use(bodyParser.json({limit:"30mb", extended: true}))
app.use(bodyParser.urlencoded({limit:"30mb", extended: true}))
app.use(cors());
app.use(express.json());
dotenv.config()
// connecting to db
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(()=> console.log('DB Connected')).catch(err => console.log(err))

// registering routes
app.use('/admin', adminRouter);
app.use('/auth', authRouter);
app.use('/patients', appointmentRouter);
app.use('/doctors', doctorsRouter);

// starting server
const server = app.listen(process.env.PORT || 5000, ()=>{console.log(`server is started on ${process.env.PORT}`)});
