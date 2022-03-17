import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Login from "../Images/login.png";
// import Logo from "../Images/starbucks.svg";
import Logo from "../Images/database.png";
import { clearUserData } from "../Redux/Slices/LoginSlice";
import AvatarDropdown from "./AvatarDropdown";

export default function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOutUser = () => {
    sessionStorage.clear();
    dispatch(clearUserData());
    navigate("/login");
  };

  return (
    <div className="header">
      <div className="logo">
        <img className="logo-icon" src={Logo} />
        <h6>Support360 infotech</h6>
      </div>
      <div className="header-container">
        {/* <img
          className="icon login-img"
          onClick={() => logOutUser()}
          src={Login}
        /> */}
        <div>
          <AvatarDropdown />
        </div>
      </div>
    </div>
  );
}
