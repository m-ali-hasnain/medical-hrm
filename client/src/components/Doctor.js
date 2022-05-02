import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Doctor = () => {
  let navigate = useNavigate();
  const [doctors, setDoctors] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const fetchDoctors = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/admin/doctors");
    console.log(data);
    setDoctors(data);
    setLoading(false);
  };

  React.useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
    <div className="container bg-white border p-5">
      <button
        className="btn btn-danger"
        onClick={() => navigate(-1)}
      >
        go back
      </button>
      {loading ? (
        "loading"
      ): <div class="container">
      <table class="table">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>


        </tr>
      </thead>
      <tbody>
        {doctors.map((doctor, key)=>{
          return <tr>
          <th scope="row">{key}</th>
          <td>{doctor.userId?.name}</td>
          <td>{doctor.userId?.email}</td>
        </tr>
        })}
      </tbody>
    </table>
      </div>}
    </div>
    </div>
  );
};

export default Doctor;
