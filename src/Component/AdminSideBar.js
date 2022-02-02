import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import AdminHome from "../Images/adminImage/admin-home.png";
import EmployeeIcon from "../Images/adminImage/employee.png";

export default function AdminSideBar() {
  const [active, setActive] = useState("/adminHome");

  const location = useLocation();

  useEffect(() => {
    setActive(location.pathname);
  }, [location.pathname]);

  return (
    <nav>
      <Link to="adminHome">
        <a href="/#" className={`${active === "/adminHome" && "active-nav"}`}>
          <div className="menu-container">
            <img className="menu-icon" src={AdminHome} />
          </div>
          <span>Home</span>
        </a>
      </Link>
      <Link to="adminEmployee">
        <a
          href="/#"
          className={`${active === "/adminEmployee" && "active-nav"}`}
        >
          <div className="menu-container">
            <img className="menu-icon" src={EmployeeIcon} />
          </div>
          <span>Employee</span>
        </a>
      </Link>
    </nav>
  );
}
