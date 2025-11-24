import { configureStore } from "@reduxjs/toolkit";
import productReducer from "../reducers/productSlice";
import cartReducer from "../reducers/cartSlice";

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
  },
});
