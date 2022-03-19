import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { clearEmployeeData } from "../Redux/Slices/EmployeeSlice";
import { clearUserData } from "../Redux/Slices/LoginSlice";

import UpArrow from "../Images/up-arrow.png";
import DownArrow from "../Images/down-arrow.png";
import Profile from "../Images/profile.png";

function AvatarDropdown() {
  const [visible, setVisible] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginState = useSelector((state) => state.login);

  const logOutUser = () => {
    sessionStorage.removeItem("userData");
    sessionStorage.removeItem("token");
    dispatch(clearUserData());
    dispatch(clearEmployeeData());
    navigate("/login");
  };

  const goToProfile = () => {
    setVisible(false);
    navigate("profile");
  };

  return (
    <div className={`user-menu-wrap ${visible && "top-10"}`}>
      <div className="mini-photo-wrapper" href="#">
        <img
          alt=""
          className="icon progfile-dropdown"
          onClick={() => setVisible(!visible)}
          src={visible ? UpArrow : DownArrow}
        />
      </div>
      {visible && (
        <div className="menu-container">
          <ul className="user-menu">
            <div className="profile-highlight">
              <div className="details">
                <div id="profile-name">{loginState?.user?.userName}</div>
              </div>
            </div>
            <li className="user-menu__item" onClick={() => goToProfile()}>
              <a className="user-menu-link" href="/#">
                <img
                  className="user-menu-icon"
                  src={Profile}
                  alt="trophy_icon"
                />
                <div>Profile</div>
              </a>
            </li>
            <div className="footer">
              <li className="user-menu__item">
                <a
                  className="user-menu-link logout-link"
                  href="/#"
                  onClick={() => logOutUser()}
                >
                  Logout
                </a>
              </li>
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
