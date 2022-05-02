import React from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
const Signup = () => {
  let navigate = useNavigate();
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const { role } = useParams();
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      alert("Please fill out all the fields");
    } else {
      console.log(role);
      if (role == 1) {
        const { response } = await axios.post(
          "http://localhost:5000/admin/doctors",
          { name: name, email: email, password: password, role: 1 }
        );
        console.log(response);
        navigate("/viewdocs");
      } else if (role == 2) {
        const { response } = await axios.post(
          "http://localhost:5000/admin/patients",
          { name: name, email: email, password: password, role: 2 }
        );
        console.log(response);
        navigate("/viewpats");
      }
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
      <div className="container bg-white shadow p-5">
          <form>
            <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
               Name
              </label>
              <input
                type="text"
                className="form-control"
                value={name}
                onChange={(e)=>{setName(e.target.value)}}
              />
              <label for="exampleInputEmail1" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                value={email}
                onChange={(e)=>{setEmail(e.target.value)}}
              />
              <div id="emailHelp" className="form-text">
                We'll never share your email with anyone else.
              </div>
            </div>
            <div className="mb-3">
              <label for="exampleInputPassword1" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="exampleInputPassword1"
                value={password}
                onChange={(e)=>{setPassword(e.target.value)}}
              />
            </div>
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Register
            </button>
          </form>
        </div>
    </>
  );
};

export default Signup;
