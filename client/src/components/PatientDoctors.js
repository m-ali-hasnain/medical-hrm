import React, { useState, useEffect } from "react";
import {
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
let patientId;
const PatientDoctors = () => {
  let navigate = useNavigate();
  const location = useLocation();
  const { data } = location.state;
  const [docs, setDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProfile = async () => {
    setLoading(true);
    console.log(data._id);
    try {
      const res = await axios.get(
        `http://localhost:5000/patients/profile/${data?._id}`
      );
      const response = await axios.get(
        `http://localhost:5000/patients/doctors/${res?.data[0]?._id}`
      );

      console.log(response?.data?.doctors);
      patientId = response?.data?._id;
      setDocs(response?.data?.doctors);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <div className="container-fluid" style={{height: "100vh"}}>
      <button
       className="btn btn-danger my-5"
        onClick={() => navigate(-1)}
      >
        go back
      </button>
      {loading ? (
        "loading"
      ) : docs.length !== 0 ? (
        <div className="container">
          <h1
            className="text-white mb-2"
          >
            List of all doctors with whom patient has appointments
          </h1>
      <div class="container bg-white p-5 ">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Record</th>

        </tr>
      </thead>
      <tbody>
        {docs.map((doctor, key)=>{
          return <tr>
          <th scope="row">{key}</th>
          <td>{doctor.userId?.name}</td>
          <td>{doctor.userId?.email}</td>
          <td><button className="btn btn-success" onClick={()=>navigate('/record', {state: {id: patientId}})}>Send audio</button></td>

        </tr>
        })}
      </tbody>
    </table>
      </div>
        </div>
      ) : (
        "This Patient has no appointment with any Doctor "
      )}
    </div>
  );
};

export default PatientDoctors;
