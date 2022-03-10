import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { EmployeeService } from "../../api/EmployeeService";
import { startLoading, stopLoading } from "./LoadingSlice";
import { tokenExpired } from "./LoginSlice";

export const getAddedCustomer = createAsyncThunk(
  "employee/getAddedCustomer",
  async (data, { rejectWithValue, dispatch }) => {
    try {
      const res = await EmployeeService.getAddedCustomerAPI(data);
      return res.data;
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(tokenExpired());
      } else {
        return rejectWithValue(error.payload.message);
      }
    }
  }
);

export const getEmployees = createAsyncThunk(
  "employee/getEmployees",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.getEmployees()
        .then((res) => {
          dispatch(stopLoading());
          if (res.status === 200) {
            return res.data.allEmployee;
          }
          if (res.response.status === 401) {
            dispatch(tokenExpired());
          } else {
            return rejectWithValue();
          }
        })
        .catch((err) => {
          return rejectWithValue(err);
        });
      return res;
    } catch (error) {
      dispatch(stopLoading());
    }
  }
);

export const getCountFunc = createAsyncThunk(
  "employee/getCountFunc",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.getDataAPI(data.type, data.user);
      if (res.response) {
        if (res.response.status === 401) {
          dispatch(tokenExpired());
        }
      } else {
        return res.data.data;
      }
    } catch (error) {
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  }
);

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
  initialState: { error: false, errorMessage: "" },
  extraReducers: {
    [getAddedCustomer.fulfilled]: (state, action) => {
      return {
        ...state,
        employeeAddedcust: action.payload,
        error: false,
      };
    },
    [getAddedCustomer.rejected]: (state, action) => {
      return { ...state, error: true, errorMessage: action.payload };
    },
    [getCountFunc.fulfilled]: (state, action) => {
      return {
        ...state,
        employeeTableData: action.payload,
        error: false,
      };
    },
    [getCountFunc.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    },
    [getEmployees.fulfilled]: (state, action) => {
      return {
        ...state,
        allEmployee: action.payload.filter((f) => f.role !== "admin"),
        error: false,
      };
    },
    [getEmployees.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    },
  },
});

const { reducer } = employeeSlice;
export default reducer;
