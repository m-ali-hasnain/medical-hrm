import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  let navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      alert("Please fill out all the fields");
    } else {
      const bodyData = { email: email, password: password };
      const { data } = await axios.post(
        "http://localhost:5000/auth/login",
        bodyData
      );
      console.log(data);
      if (data.role == 0) {
        navigate("/admin/0", {
          state: {
            data: data,
          },
        });
      } else if (data.role == 1) {
        navigate("/admin/1", {
          state: {
            data: data,
          },
        });
      } else if (data.role == 2) {
        navigate("/admin/2", {
          state: {
            data: data,
          },
        });
      }
    }
  };
  return (
    <>
      <h1
        style={{
          color: "#e8630a",
          textAlign: "center",
          marginTop: "40px",
        }}
      >
        SIGN IN
      </h1>
        <div className="container bg-white shadow p-5">
          <form>
            <div className="mb-3">
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
              Submit
            </button>
          </form>
        </div>

    </>
  );
};

export default Login;
