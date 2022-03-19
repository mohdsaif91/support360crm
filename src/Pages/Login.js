import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginFun } from "../Redux/Slices/LoginSlice";

const initialLogin = {
  userName: "",
  password: "",
  role: "employee",
  emailValidation: "",
};

export default function Login() {
  const [showPassword, setShowPassword] = useState(true);
  const [login, setLogin] = useState({ ...initialLogin });

  const loginData = useSelector((state) => state.login);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loginUser = () => {
    const { emailValidation, ...restProps } = login;
    dispatch(loginFun(restProps));
  };

  useEffect(() => {
    if (loginData.loggedIn) {
      if (loginData?.user?.role === "admin") {
        navigate("/adminHome");
      } else {
        navigate("/");
      }
    }
  }, [loginData, navigate]);

  return (
    <div className="login-container">
      <form className="form">
        <h1>Login</h1>
        <div className="row">
          <input
            value={login.userName}
            type="text"
            placeholder="User Name"
            onChange={(e) => setLogin({ ...login, userName: e.target.value })}
          />
        </div>
        <div className="row">
          <input
            value={login.password}
            type={`${showPassword ? "password" : "text"}`}
            onChange={(e) => setLogin({ ...login, password: e.target.value })}
          />
          <img
            className="password-icon"
            onClick={() => setShowPassword(!showPassword)}
            alt=""
            src={`${
              showPassword
                ? "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8SA14-A-zoRaiJ2GdUiESsisaFiHNYrUZtjtjZqnth0D_KdfkwzQWIdCjbzhAoYKPTvs&usqp=CAU"
                : "https://icon-library.com/images/icon-eyes/icon-eyes-12.jpg"
            }`}
          />
        </div>
        <input onClick={() => loginUser()} type="button" value="Login" />
        {loginData.error && (
          <div className="error-text">{loginData.errorMessage}</div>
        )}
      </form>
    </div>
  );
}
