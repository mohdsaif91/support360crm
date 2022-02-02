import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeService } from "../../api/EmployeeService";
import { startLoading, stopLoading } from "./LoadingSlice";

export const addEmployeeFun = createAsyncThunk(
  "employee/addEmployeeFun",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.addEmployeeAPI(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    } finally {
      dispatch(stopLoading());
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: {},
  extraReducers: {
    [addEmployeeFun.fulfilled]: (state, action) => {},
  },
});
