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
      })
      .catch((err) => {
        dispatch(stopLoading());
        console.log(err.response);
      });
    // } catch (error) {
    //   if (error.response.status === 401) {
    //     dispatch(tokenExpired());
    //     console.log("token issue");
    //   } else {
    //     return rejectWithValue(error.response.data);
    //   }
    // } finally {
    //   dispatch(stopLoading());
    // }
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

const loginSlice = createSlice({
  name: "login",
  initialState: { ...initialLogin },
  extraReducers: {
    [loginFun.fulfilled]: (state, action) => {
      const { token, ...restProps } = action.payload;
      return {
        ...state,
        tokenExpire: false,
        user: restProps,
        loggedIn: true,
        loadingState: false,
      };
    },
    [loginFun.rejected]: (state, action) => {
      return {
        ...state,
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

const { reducer } = loginSlice;
export default reducer;
