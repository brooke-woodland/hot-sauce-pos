import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchQuery: "",
  currentProduct: null,
  shoppingCart: [],
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setSearchQuery: (state, action) => {
      state.searchQuery = action.payload;
    },
    setProduct: (state, action) => {
      state.currentProduct = action.payload;
    },
    setShoppingCart: (state, action) => {
      state.shoppingCart = action.payload;
    },
    addToCart: (state, action) => {
      const existingItem = state.shoppingCart.find(
        (item) => item.product.id === action.payload.product.id
      );
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.shoppingCart.push(action.payload);
      }
    },
    removeFromCart: (state, action) => {
      console.log(action.payload.product.id);
      state.shoppingCart = state.shoppingCart.filter(
        (item) => action.payload.product.id !== item.product.id
      );
    },
  },
});

export const {
  setSearchQuery,
  setProduct,
  setShoppingCart,
  addToCart,
  removeFromCart,
} = homeSlice.actions;

export default homeSlice.reducer;
