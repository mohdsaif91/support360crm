import React from "react";

import Logo from "../Images/database.png";
import AvatarDropdown from "./AvatarDropdown";

export default function Header() {
  return (
    <div className="header">
      <div className="logo">
        <img alt="" className="logo-icon" src={Logo} />
        <h6>Support360 infotech</h6>
      </div>
      <div className="header-container">
        <div>
          <AvatarDropdown />
        </div>
      </div>
    </div>
  );
}
