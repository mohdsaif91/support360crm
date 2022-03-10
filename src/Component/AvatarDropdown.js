import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
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
    navigate("/login");
  };

  return (
    <div className={`user-menu-wrap ${visible && "top-10"}`}>
      <div class="mini-photo-wrapper" href="#">
        <img
          className="icon progfile-dropdown"
          onClick={() => setVisible(!visible)}
          src={visible ? UpArrow : DownArrow}
        />
      </div>
      {visible && (
        <div className="menu-container">
          <ul className="user-menu">
            <div className="profile-highlight">
              <img
                src="https://images.unsplash.com/photo-1578976563986-fb8769ab695e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=934&q=80"
                alt="profile-img"
              />
              <div className="details">
                <div id="profile-name">{loginState?.user?.userName}</div>
              </div>
            </div>
            <li class="user-menu__item">
              <a className="user-menu-link" href="#">
                <img
                  className="user-menu-icon"
                  src={Profile}
                  alt="trophy_icon"
                />
                <div>Profile</div>
              </a>
            </li>
            {/* <li class="user-menu__item">
              <a class="user-menu-link" href="#">
                <img
                  className="user-menu-icon"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/team.png"
                  alt="team_icon"
                />
                <div>Team</div>
              </a>
            </li>
            <li class="user-menu__item">
              <a class="user-menu-link" href="#">
                <img
                  className="user-menu-icon"
                  src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/1604623/book.png"
                  alt="team_icon"
                />
                <div>Log History</div>
              </a>
            </li> */}
            <div className="footer">
              <li class="user-menu__item">
                <a
                  class="user-menu-link logout-link"
                  href="#"
                  onClick={() => logOutUser()}
                >
                  Logout
                </a>
              </li>
              {/* <li class="user-menu__item">
                <a class="user-menu-link" href="#">
                  Settings
                </a>
              </li> */}
            </div>
          </ul>
        </div>
      )}
    </div>
  );
}

export default AvatarDropdown;
