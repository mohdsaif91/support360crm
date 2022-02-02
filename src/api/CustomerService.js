import http from "./index";

const getCustomer = () => {
  return http.get("/customer");
};

const addCustomer = (data) => {
  return http.post("/customer", data);
};

export const CustomerService = {
  getCustomer,
  addCustomer,
};
