import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

//  const setTabIndexAction = createAsyncThunk(
//   "util/setTabIndex",
//   (data, {}) => {
//     return data;
//   }
// );

const UtilSlice = createSlice({
  name: "util",
  initialState: { tabIndexValue: 0 },
  reducers: {
    setTabIndexAction: (state, action) => {
      console.log("looki ", action.payload);
      return {
        ...state,
        tabIndexValue: action.payload,
      };
    },
  },
});

export const { setTabIndexAction } = UtilSlice.actions;

const { reducer } = UtilSlice;
export default reducer;
