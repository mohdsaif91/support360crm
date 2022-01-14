import React from "react";

import Login from "../Images/login.png";
import Logo from "../Images/starbucks.svg";
import Logout from "../Images/logout.png";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img className="logo-icon" src={Logo} />
        <h6>CRM</h6>
      </div>
      <div className="login-container">
        <img className="icon login-img" src={Login} />
      </div>
    </div>
  );
}
