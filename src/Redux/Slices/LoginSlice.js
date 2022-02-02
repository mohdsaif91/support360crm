import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { LoginService } from "../../api/LoginService";
import { startLoading, stopLoading } from "./LoadingSlice";

export const loginFun = createAsyncThunk(
  "login/login",
  async (data, { rejectWithValue, dispatch }) => {
    dispatch(startLoading());
    try {
      const res = await LoginService.LoginUser(data);
      localStorage.setItem("token", res.data.token);
      return res.data;
    } catch (error) {
      return rejectWithValue(error.response.statusText);
    } finally {
      dispatch(stopLoading());
    }
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
  initialState: { loadingState: false },
  extraReducers: {
    // builder.addCase(loginFun.pending),
    [loginFun.pending]: (state, action) => {
      return {
        ...state,
        loadingState: true,
      };
    },
    [loginFun.fulfilled]: (state, action) => {
      const { token, ...restProps } = action.payload;
      return { ...state, user: restProps, loggedIn: true, loadingState: false };
    },
    [loginFun.rejected]: (state, action) => {
      return { ...state, loggedIn: false, loadingState: false };
    },
  },
});

const { reducer } = loginSlice;
export default reducer;
