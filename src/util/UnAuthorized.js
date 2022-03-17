import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function UnAuthorized() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logInAgain = () => {
    navigate("/login");
  };

  return (
    <div className="auth-container text-wrapper">
      <div className="title" data-content="404">
        401 - ACCESS DENIED
      </div>

      <div className="subtitle">
        Oops, Your Session has expired Please login-again.
      </div>
      <div className="auth-buttons">
        <button className="auth-button" onClick={() => logInAgain()}>
          Login Again !
        </button>
      </div>
    </div>
  );
}
