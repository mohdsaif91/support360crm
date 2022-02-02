import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { CustomerService } from "../../api/CustomerService";

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (obj, { rejectWithValue }) => {
    try {
      const res = await CustomerService.getCustomer();
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const addCustomer = createAsyncThunk(
  "customer/addCustomer",
  async (data, { rejectWithValue }) => {
    try {
      const res = await CustomerService.addCustomer(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {},
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
