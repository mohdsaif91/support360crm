import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginService } from "../../api/LoginService";
import { startLoading, stopLoading } from "./LoadingSlice";

const initialLogin = {
  user: null,
  loggedIn: false,
  errorMessage: "",
  tokenExpire: false,
};

export const tokenExpired = createAsyncThunk("login/tokenExpire", () => {
  localStorage.clear();
  sessionStorage.removeItem("userData");
  return true;
});

export const tokenValid = createAsyncThunk("login/tokenValid", () => {
  return true;
});

export const clearUserData = createAsyncThunk("login/clearData", () => {
  localStorage.clear();
  sessionStorage.removeItem("userData");
  return true;
});

export const setUserData = createAsyncThunk("login/setData", (data) => {
  return data;
});

export const loginFun = createAsyncThunk(
  "login/login",
  async (data, { rejectWithValue, dispatch, fulfillWithValue }) => {
    dispatch(startLoading());
    // try {
    return await LoginService.LoginUser(data)
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          sessionStorage.setItem("userData", JSON.stringify(res.data));
          return fulfillWithValue(res.data);
        }
        if (res.response.status === 401) {
          return rejectWithValue(res.response.data);
        }
        if (res.response.status === 404) {
          return rejectWithValue(res.response.data);
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
      });
  }
);

export const signUp = createAsyncThunk(
  "login/signUp",
  async (data, { rejectWithValue }) => {
    try {
      const res = await LoginService.signUpUser(data);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    }
  }
);

export const updatePasswordFun = createAsyncThunk(
  "employee/updatePasswordFun",
  async (data, { dispatch, fulfillWithValue, rejectWithValue }) => {
    dispatch(startLoading());
    console.log(data);
    return await LoginService.UpdatePassword(data)
      .then((res) => {
        dispatch(stopLoading());
        if (res.status === 200) {
          return fulfillWithValue(res.data);
        } else if (res.status === 401) {
          return rejectWithValue(res.response.data);
        }
      })
      .catch((err) => {
        dispatch(stopLoading());
        return rejectWithValue(err.response.data);
      });
  }
);

const loginSlice = createSlice({
  name: "login",
  initialState: { ...initialLogin },
  reducers: {
    profileUpdate: (state, action) => {
      const { token, ...restProps } = action.payload;
      return {
        ...state,
        tokenExpire: false,
        user: restProps,
        loggedIn: true,
        loadingState: false,
      };
    },
  },
  extraReducers: {
    [loginFun.fulfilled]: (state, action) => {
      const { token, ...restProps } = action.payload;
      return {
        ...state,
        error: false,
        tokenExpire: false,
        user: restProps,
        loggedIn: true,
        loadingState: false,
      };
    },
    [loginFun.rejected]: (state, action) => {
      return {
        ...state,
        error: true,
        loggedIn: false,
        loadingState: false.valueOf,
        errorMessage: action.payload,
      };
    },
    [clearUserData.fulfilled]: (state, action) => {
      return { ...state, user: null, loggedIn: false };
    },
    [tokenValid.fulfilled]: (state, action) => {
      return { ...state, tokenExpire: false };
    },
    [tokenExpired.fulfilled]: (state, action) => {
      return {
        ...state,
        tokenExpire: true,
        user: null,
        loggedIn: false,
      };
    },
    [setUserData.fulfilled]: (state, action) => {
      return { ...state, user: action.payload, loggedIn: true };
    },
  },
});

export const { profileUpdate } = loginSlice.actions;
const { reducer } = loginSlice;
export default reducer;
