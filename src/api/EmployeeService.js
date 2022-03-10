import { onAuthenticate } from "./APICall";

const addEmployeeAPI = (data) => {
  const apiData = {
    url: "/employee",
    method: "post",
    data,
  };
  return onAuthenticate({ ...apiData });
};

const getAddedCustomerAPI = (data) => {
  const apiData = {
    url: `/employee/${data}`,
    method: "get",
  };
  return onAuthenticate({ ...apiData });
};

const getDataAPI = (data, user) => {
  const apiData = {
    url: `/employee/${data}/${user}`,
    method: "get",
  };
  return onAuthenticate({ ...apiData });
};

const getEmployees = (data, user) => {
  const apiData = {
    url: `/employee/all`,
    method: "get",
  };
  return onAuthenticate({ ...apiData });
};

export const EmployeeService = {
  addEmployeeAPI,
  getAddedCustomerAPI,
  getDataAPI,
  getEmployees,
};
