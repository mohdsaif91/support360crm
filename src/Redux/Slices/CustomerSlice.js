import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { onAuthenticate } from "../../api/APICall";
import { CustomerService } from "../../api/CustomerService";
import { startLoading, stopLoading } from "./LoadingSlice";
import { tokenExpired } from "./LoginSlice";
import * as AuthenticateAPI from "../../api/APICall";

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await CustomerService.getCustomer();
      if (res.status === 401) {
      } else {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await CustomerService.addCustomer(data);
      if (res.status === 401) {
        dispatch(tokenExpired());
      } else {
        return res.data;
      }
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    } finally {
      dispatch(stopLoading());
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: { customerData: [] },
  extraReducers: {
    [addCustomer.fulfilled]: (state, action) => {
      return {
        ...state,
        customerData: [...state.customerData, action.payload],
      };
    },
    [getCustomer.fulfilled]: (state, action) => {
      return {
        ...state,
        customerData: action.payload,
      };
    },
    [getCustomer.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    },
  },
});

const { reducer } = customerSlice;
export default reducer;
