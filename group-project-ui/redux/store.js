import { configureStore } from "@reduxjs/toolkit";
import home from "./slices/landingslice";
import checkout from "./slices/checkoutslice";

export const store = configureStore({
  reducer: {
    home,
    checkout,
  },
});
