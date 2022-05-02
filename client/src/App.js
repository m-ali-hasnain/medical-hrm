import { BrowserRouter, Route, Routes, Navigate, Link } from "react-router-dom";
import Patient from "./components/Patient";
import Doctor from "./components/Doctor";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import MainIndex from "./components/MainIndex";
import AdminIndex from "./components/AdminIndex";
import PatientDoctors from "./components/PatientDoctors";
import DoctorPatients from "./components/DoctorPatients";
import Appointment from "./components/Appointment";
import Recorder from "./components/recording/Recording";
import Player from "./components/recording_player/Player";
import "./App.css"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <div className="App1">
          {/* <nav>
            <Link to="/admin/createdoc/:role"> Create Doctor </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link to="/admin/createpat/:role"> Create Patient </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link to="/admin/viewpats"> View Patients </Link> &nbsp;&nbsp;&nbsp;
            <Link to="/admin/viewpdocs"> View Doctors </Link> &nbsp;&nbsp;&nbsp;
          </nav> */}
          <div className="App2">
            <Routes>
              <Route path="/" element={<MainIndex />}>
                <Route index element={<Login />} />
                <Route path="admin/:role" element={<AdminIndex />}></Route>
                <Route path="viewdocs" element={<Doctor />} />
                <Route path="viewpats" element={<Patient />} />
                <Route path="createpat/:role" element={<Signup />} />
                <Route path="createdoc/:role" element={<Signup />} />
                <Route path="/patients/doctors" element={<PatientDoctors />} />
                <Route path="/doctors/patients" element={<DoctorPatients />} />
                <Route path="/patients/appointment" element={<Appointment />} />
                <Route path="/record" element={<Recorder />} />
                <Route path="/play" element={<Player />} />

                <Route path="*" element={<NotFound />} />
              </Route>
            </Routes>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
