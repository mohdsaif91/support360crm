import { configureStore } from "@reduxjs/toolkit";

import customerSlice from "./Slices/CustomerSlice";
import loginSlice from "./Slices/LoginSlice";
import loadingSlice from "./Slices/LoadingSlice";
import employeeSlice from "./Slices/EmployeeSlice";
import adminCustomer from "./Slices/Admin/AdminCustomerSlice";
import UtilReducer from "./Slices/utilSlice";

const reducer = {
  customer: customerSlice,
  login: loginSlice,
  loading: loadingSlice,
  employee: employeeSlice,
  adminCustomer,
  UtilReducer: UtilReducer,
};

const store = configureStore({
  reducer: reducer,
  devTools: true,
});

export default store;
