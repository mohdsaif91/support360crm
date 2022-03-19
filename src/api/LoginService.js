import { onAuthenticate } from "./APICall";
import http from "./index";

const LoginUser = (data) => {
  const apiData = {
    url: "/auth/login",
    method: "post",
    data,
  };
  return onAuthenticate({ ...apiData });
};

const signUpUser = (data) => {
  return http.post("/auth/signup", data);
};

const UpdatePassword = (data) => {
  const apiData = {
    url: "/auth/updatePassword",
    method: "put",
    data,
  };
  return onAuthenticate({ ...apiData });
};

export const LoginService = {
  LoginUser,
  signUpUser,
  UpdatePassword,
};
