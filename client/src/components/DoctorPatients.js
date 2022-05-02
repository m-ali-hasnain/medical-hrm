import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
const DoctorPatients = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const { data } = location.state;
  const [pats, setPats] = useState([]);
  const [loading, setLoading] = useState(false);
  const getProfile = async () => {
    setLoading(true);
    console.log(data._id);
    try {
      const res = await axios.get(
        `http://localhost:5000/doctors/profile/${data?._id}`
      );
      const response = await axios.get(
        `http://localhost:5000/doctors/patients/${res?.data[0]?._id}`
      );

      console.log(response?.data?.patients);
      setPats(response?.data?.patients);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);
  return (
    <>
      <button
       className="btn btn-danger my-2"
        onClick={() => navigate(-1)}
      >
        go back
      </button>
      {loading ? (
        "loading"
      ) : pats.length != 0 ? (
        <div className="container">
        <h1
          className="text-white my-2"
        >
          Appointments with
        </h1>

      <div className="container mt-5 bg-white p-5">
      <table className="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Listen</th>

        </tr>
      </thead>
      <tbody>
        {pats.map((patient, key)=>{
          return <tr>
          <th scope="row">{key}</th>
          <td>{patient.userId?.name}</td>
          <td>{patient.userId?.email}</td>
          <td><button className="btn btn-primary" onClick={()=>{navigate('/play', {state: {id: patient._id}})}}>Listen</button></td>
        </tr>
        })}
      </tbody>
    </table>
      </div>
        </div>
      ) : (
        "This patient has no appointment with any doctor "
      )}
    </>
  );
};

export default DoctorPatients;
