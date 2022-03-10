import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerService } from "../../../api/CustomerService";
import { startLoading, stopLoading } from "../LoadingSlice";
import { tokenExpired } from "../LoginSlice";

export const getFilteredEmployeeData = createAsyncThunk(
  "adminEmployee/getFilteredEmployeeData",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(innerLoader(true));
    try {
      const res = await CustomerService.getAdminCustomer(data);
      dispatch(innerLoader(false));
      return res.data;
    } catch (error) {
      dispatch(innerLoader(false));
      if (error.response.status === 401) {
        dispatch(tokenExpired());
      } else {
        return rejectWithValue(error);
      }
    }
  }
);

const innerLoader = createAsyncThunk(
  "adminEmployee/innerLoader",
  (data, {}) => {
    return data;
  }
);

export const getFilteredEmployeeDataChange = createAsyncThunk(
  "adminEmployee/getFilteredEmployeeData",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await CustomerService.getAdminCustomer(data);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(tokenExpired());
      } else {
        return rejectWithValue(error);
      }
      return rejectWithValue(error);
    }
  }
);

const adminCustomer = createSlice({
  name: "adminEmployee",
  initialState: { error: false, errorMessage: "", loader: false },
  extraReducers: {
    [getFilteredEmployeeData.fulfilled]: (state, action) => {
      return { ...state, filteredCustomer: action.payload, error: false };
    },
    [getFilteredEmployeeData.rejected]: (state, action) => {
      return { ...state, error: true, errorMessage: action.payload };
    },
    [getFilteredEmployeeDataChange.fulfilled]: (state, action) => {
      return { ...state, filteredCustomer: action.payload, error: false };
    },
    [innerLoader.fulfilled]: (state, action) => {
      return {
        ...state,
        loader: action.payload,
      };
    },
    [getFilteredEmployeeDataChange.rejected]: (state, action) => {
      return { ...state, error: true, errorMessage: action.payload };
    },
  },
});

const { reducer } = adminCustomer;

export default reducer;
