import { createSlice } from "@reduxjs/toolkit";
 
const initialState = {
  orderButton: "Place Order",
  shippingSameAsBilling: true,
  email: "",
  shippingFirstName: "",
  shippingState: "",
};
 
export const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setShippingSameAsBilling: (state, action) => {
      state.shippingSameAsBilling = !state.shippingSameAsBilling;
    },
    setShippingState: (state, action) => {
      state.shippingState = action.payload;
    },
    setInformation: (state, action) => {
      state[action.payload.key] = action.payload.value;
    },
  },
});
 
export const { setShippingSameAsBilling, setShippingState, setInformation } = checkoutSlice.actions;
 
export default checkoutSlice.reducer;