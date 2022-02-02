import { createAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const startLoading = createAsyncThunk("loading/startLoading", () => {
  return { payload: true };
});
export const stopLoading = createAsyncThunk("loading/stopLoading", () => {
  return { payload: false };
});

const LoadingSlice = createSlice({
  name: "loading",
  initialState: { loadingState: false },
  extraReducers: {
    [startLoading.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingState: true,
      };
    },
    [stopLoading.fulfilled]: (state, action) => {
      return {
        ...state,
        loadingState: false,
      };
    },
  },
});

const { reducer } = LoadingSlice;
export default reducer;
