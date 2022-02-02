import React from "react";
import { useNavigate } from "react-router-dom";

import Login from "../Images/login.png";
import Logo from "../Images/starbucks.svg";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className="header">
      <div className="logo">
        <img className="logo-icon" src={Logo} />
        <h6>CRM</h6>
      </div>
      <div className="header-container">
        <img
          className="icon login-img"
          onClick={() => navigate("/login")}
          src={Login}
        />
      </div>
    </div>
  );
}
