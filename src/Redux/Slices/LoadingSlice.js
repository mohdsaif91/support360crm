import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startLoading = createAsyncThunk("loading/startLoading", () => {
  return true;
});

export const stopLoading = createAsyncThunk("loading/stopLoading", () => {
  return false;
});

const LoadingSlice = createSlice({
  name: "loading",
  initialState: { loadingState: false },
  reducers: {},
  extraReducers: {
    [startLoading.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingState: action.payload,
      };
    },
    [stopLoading.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingState: action.payload,
      };
    },
  },
});

const { reducer } = LoadingSlice;
export default reducer;
