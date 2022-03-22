import { onAuthenticate } from "./APICall";
import http from "./index";

const getCustomer = () => {
  const apiData = {
    url: "/customer",
    method: "get",
  };
  return onAuthenticate({ ...apiData });
};

const addCustomer = (data) => {
  const apiData = {
    url: "/customer",
    method: "post",
    data,
  };
  return onAuthenticate({ ...apiData });
  // return http.post("/customer", data);
};

const getAdminCustomer = (data) => {
  const apiData = {
    url: "/customer/getFilteredCustomer",
    method: "post",
    data,
  };
  return onAuthenticate({ ...apiData });
};

export const CustomerService = {
  addCustomer,
  getAdminCustomer,
  getCustomer,
};
