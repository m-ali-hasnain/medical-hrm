import React, { useState, useEffect } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
import axios from "axios";
const Appointment = () => {
  let navigate = useNavigate();
  const [selDoc, setSelDoc] = useState("");
  const [selPat, setSelPat] = useState("");
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
      setSelPat(res?.data[0]?._id);
      const response = await axios.get(
        "http://localhost:5000/patients/doctors"
      );
      console.log(response?.data);
      setDocs(response?.data);
    } catch (err) {
      console.log(err.message);
    }
    setLoading(false);
  };
  useEffect(() => {
    getProfile();
  }, []);
  const handleChange = (event) => {
    setSelDoc(event.target.value);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selPat || !selDoc) {
      alert("Your requests missing some data");
    } else {
      const bodyData = { doctorId: selDoc, patientId: selPat };
      const { data } = await axios.post(
        "http://localhost:5000/patients/appointment",
        bodyData
      );
      console.log(data);
      console.log("successfully appointment is created");
    }
  };
  return (
    <>
      <button
        className="btn btn-danger my-2"
        onClick={() => navigate(-1)}
      >
        go back
      </button>
      <div className="container-fluid d-flex align-items-center justify-content-center" style={{height: "80vh"}}>
      <div className="container bg-white p-5">
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="select" className="form-label">
              Select Doctor
            </label>
            <select
              className="form-control"
              id="select"
              value={selDoc}
              onChange={handleChange}
            >
              {docs.map((item, index) => (
                <option value={item?._id}>{item.userId.name}</option>
              ))}
            </select>
          </div>
          <div className="mb-3">
            <input
              className="btn btn-secondary"
              type="submit"
              value="Create Appointment"
            />
          </div>
        </form>
      </div>
      </div>
    </>
  );
};

export default Appointment;
