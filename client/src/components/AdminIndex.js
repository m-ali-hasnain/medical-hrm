import React, { useEffect } from "react";
import {
  Link,
  Outlet,
  useParams,
  useLocation,
  useNavigate,
} from "react-router-dom";
const Adminindex = () => {
  // const location = useLocation();
  const { state } = useLocation();
  let navigate = useNavigate();
  const { data } = state;
  const { role } = useParams();
  console.log(data);

  return (
    <>
      {/* <pre>{JSON.stringify(data, null, 4)}</pre> */}
      <button
       className="btn btn-danger my-2"
        onClick={() => navigate(-1)}
      >
        go back
      </button>
      <div className="container bg-white shadow d-flex align-items-center justify-content-center"
        style={{
          height: "80vh",
        }}
      >
        {role == 0 ? (
          <div className="container d-flex  align-items-center justify-content-center">
            <Link
              className="btn btn-secondary"
              to={`/createdoc/1`}
            >
              {" "}
              Create Doctor{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link
             className="btn btn-secondary"
              to={`/createpat/2`}
            >
              {" "}
              Create Patient{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link
              className="btn btn-success"
              to={`/viewpats`}
            >
              {" "}
              View Patients{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link
             className="btn btn-primary"
              to={`/viewdocs`}
            >
              {" "}
              View Doctors{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
          </div>
        ) : null}
        {role == 1 ? (
          <nav>
            <Link
              className="btn btn-success"
              to="/doctors/patients"
              state={{ data: data }}
            >
              {" "}
              View Patients{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
          </nav>
        ) : null}
        {role == 2 ? (
          <nav>
            <Link
              className="btn btn-secondary"
              to="/patients/doctors"
              state={{ data: data }}
            >
              {" "}
              View Doctors{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
            <Link
              className="btn btn-primary"
              to="/patients/appointment"
              state={{ data: data }}
            >
              {" "}
              Create Appointment{" "}
            </Link>{" "}
            &nbsp;&nbsp;&nbsp;
          </nav>
        ) : null}

        <Outlet />
      </div>
    </>
  );
};

export default Adminindex;
