import http from "./index";

const LoginUser = (data) => {
  return http.post("/auth/login", data);
};

const signUpUser = (data) => {
  return http.post("/auth/signup", data);
};

export const LoginService = {
  LoginUser,
  signUpUser,
};
