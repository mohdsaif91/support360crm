import http from "./index";

const addEmployeeAPI = (data) => {
  return http.post("/employee", data);
};

export const EmployeeService = {
  addEmployeeAPI,
};
