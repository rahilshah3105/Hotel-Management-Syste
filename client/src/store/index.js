import { configureStore } from "@reduxjs/toolkit";
import { snakbarSlice } from "./slices/snakbar";

const rootReducer = {
  snakbar: snakbarSlice.reducer, //for snakbar alert
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
