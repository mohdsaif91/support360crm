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
    <div class="auth-container text-wrapper">
      <div class="title" data-content="404">
        401 - ACCESS DENIED
      </div>

      <div class="subtitle">
        Oops, Your Token has expired Please login-again.
      </div>
      <div class="auth-buttons">
        <button class="auth-button" onClick={() => logInAgain()}>
          Login Again !
        </button>
      </div>
    </div>
  );
}
