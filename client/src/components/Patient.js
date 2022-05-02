import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Doctor = () => {
  let navigate = useNavigate();
  const [patients, setPatients] = React.useState([]);
  const [loading, setLoading] = useState(false);
  const fetchPatients = async () => {
    setLoading(true);
    const { data } = await axios.get("http://localhost:5000/admin/patients");
    console.log(data);
    setPatients(data);
    setLoading(false);
  };
  React.useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <div
      className="container-fluid d-flex align-items-center justify-content-center"
      style={{ height: "100vh" }}
    >
      <div className="container bg-white border p-5">
        <button className="btn btn-danger" onClick={() => navigate(-1)}>
          go back
        </button>
        {loading ? (
          "loading"
        ) : (
          <div class="container">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                </tr>
              </thead>
              <tbody>
                {patients.map((patient, key) => {
                  return (
                    <tr>
                      <th scope="row">{key}</th>
                      <td>{patient.userId?.name}</td>
                      <td>{patient.userId?.email}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Doctor;
