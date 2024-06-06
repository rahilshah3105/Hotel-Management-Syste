import { createSlice } from "@reduxjs/toolkit";

export const snakbarSlice = createSlice({
  name: "snakbar",
  initialState: {
    open: false,
    type: "",
    message: "",
  },
  reducers: {
    showSnakbar: (state, action) => {
      state.open = true;
      state.type = action.payload.type;
      state.message = action.payload.message;
    },
    hideSnakbar: (state) => {
      state.open = false;
      state.type = "";
      state.message = "";
    },
  },
});

export const { showSnakbar, hideSnakbar } = snakbarSlice.actions;

export default snakbarSlice.reducer;
