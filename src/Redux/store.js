import { configureStore } from "@reduxjs/toolkit";

import customerSlice from "./Slices/CustomerSlice";
import loginSlice from "./Slices/LoginSlice";
import loadingSlice from "./Slices/LoadingSlice";

const reducer = {
  customer: customerSlice,
  login: loginSlice,
  loading: loadingSlice,
};

const store = configureStore({ reducer: reducer, devTools: true });

export default store;
