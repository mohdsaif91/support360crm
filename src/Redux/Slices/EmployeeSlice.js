import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { EmployeeService } from "../../api/EmployeeService";
import { startLoading, stopLoading } from "./LoadingSlice";
import { tokenExpired } from "./LoginSlice";
import { profileUpdate } from "./LoginSlice";

export const getAddedCustomer = createAsyncThunk(
  "employee/getAddedCustomer",
  async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    try {
      const res = await EmployeeService.getAddedCustomerAPI(data);
      if (res.status === 200) {
        return fulfillWithValue(res.data);
      } else if (res.response.status === 409) {
        return rejectWithValue(res.response.data);
      } else if (res.response.status === 401) {
        dispatch(tokenExpired());
      }
    } catch (error) {
      if (error.response.status === 401) {
        dispatch(tokenExpired());
      } else {
        return rejectWithValue(error.payload.message);
      }
    }
  }
);

export const updateProfilefun = createAsyncThunk(
  "employee/updateProfile",
  async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.UpdateProfile(data);
      dispatch(stopLoading());
      if (res.status === 200) {
        dispatch(profileUpdate(res.data));
        return fulfillWithValue(res.data);
      } else if (res.response.status === 401) {
        dispatch(tokenExpired());
      }
    } catch (err) {
      dispatch(stopLoading());
      return rejectWithValue(err);
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
            return res.data;
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
  async (data, { fulfillWithValue, rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.addEmployeeAPI(data);
      if (res.status === 201) {
        return fulfillWithValue(res.data);
      } else if (res.response.status === 409) {
        return rejectWithValue(res.response.data);
      } else {
      }
    } catch (error) {
      dispatch(stopLoading());
      return rejectWithValue(error.response.statusText);
    } finally {
      dispatch(stopLoading());
    }
  }
);

export const removeEmployeeFun = createAsyncThunk(
  "employee/removeEmployeefun",
  async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
    dispatch(startLoading());
    try {
      const res = await EmployeeService.removeEmployee(data);
      if (res.response) {
        dispatch(stopLoading());
        if (res.response.status === 401) {
          dispatch(tokenExpired());
        }
      } else {
        return fulfillWithValue(res.data);
      }
    } catch (error) {
      dispatch(stopLoading());
      return rejectWithValue(error);
    } finally {
      dispatch(stopLoading());
    }
  }
);

const employeeSlice = createSlice({
  name: "employee",
  initialState: { error: false, errorMessage: "" },
  reducers: {
    clearEmployeeData: (state, action) => {
      return {
        ...state,
        employeeTableData: null,
      };
    },
  },
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
        customerName: action.payload.customerName,
        allEmployee: action.payload.allEmployee.filter(
          (f) => f.role !== "admin"
        ),
        customerNumber: action.payload.customerNumber,
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
    [addEmployeeFun.fulfilled]: (state, action) => {
      return {
        ...state,
        allEmployee: [...state.allEmployee, action.payload.data],
      };
    },
    [addEmployeeFun.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
        errorMessage: action.payload,
      };
    },
    [removeEmployeeFun.fulfilled]: (state, action) => {
      return {
        ...state,
        allEmployee: state.allEmployee.filter((f) => f._id !== action.payload),
        error: false,
      };
    },
    [removeEmployeeFun.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
      };
    },
    [updateProfilefun.fulfilled]: (state, action) => {
      sessionStorage.removeItem("userData");
      sessionStorage.setItem("userData", JSON.stringify(action.payload));
      return {
        ...state,
        error: false,
        allEmployee: state.allEmployee.map((m) => {
          if (m._id === action.payload._id) {
            return action.payload;
          } else {
            return m;
          }
        }),
      };
    },
  },
});

export const { clearEmployeeData } = employeeSlice.actions;
const { reducer } = employeeSlice;
export default reducer;
