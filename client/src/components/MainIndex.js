import React from "react";
import { Outlet } from "react-router-dom";
const MainIndex = () => {
  return (
    <div>
      {/* 
            <div>
              <Link to="/aboutus"> About Us </Link>
            </div>
            <div>
              <Link to="/contactus"> Contact us </Link>
            </div>
            */}
      <Outlet />
      {/* <Link to="/aboutus"> About Us </Link>
        <Link to="/contactus"> Contact us </Link> */}
    </div>
  );
};

export default MainIndex;
