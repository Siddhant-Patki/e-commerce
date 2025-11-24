import { createSlice } from "@reduxjs/toolkit";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const initialState = {
  cartItems: [],
  productPrice: 0,
  productQuantity: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { id, price } = action.payload;
      const existingItem = state.cartItems.find((item) => item.id === id);

      if (existingItem) {
        // increment product
        existingItem.productQuantity += 1;
        existingItem.productPrice = existingItem.productQuantity * price;

        // update global state
        state.productQuantity += 1;
        state.productPrice += price;
      } else {
        // add to cart
        state.cartItems.push({
          ...action.payload,
          productQuantity: 1,
          productPrice: price,
          unitPrice: price, 
        });

        // update global state
        state.productQuantity += 1;
        state.productPrice += price;
      }
      console.log("item added", JSON.parse(JSON.stringify(state.cartItems)));
      toast.success("Item Added Successfully!")
    },
    removeFromCart: (state, action) => {
      const itemToRemove = state.cartItems.find(
        (item) => item.id === action.payload.id
      );

      if (itemToRemove) {
        // update global
        state.productQuantity -= itemToRemove.productQuantity;
        state.productPrice -= itemToRemove.productPrice;

        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id
        );
        console.log("item removed", JSON.parse(JSON.stringify(state.cartItems)));

        // Show toast notification
        toast.warning('Item removed from cart!');
      }
    },

    updateCartItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.cartItems.find((item) => item.id === id);
      if (item) {
        // update global state
        state.productQuantity = state.productQuantity - item.productQuantity + quantity;
        state.productPrice = state.productPrice - item.productPrice + item.unitPrice * quantity;

        // update item
        item.productQuantity = quantity;
        item.productPrice = item.unitPrice * quantity;
      }
    },
  },
});

export const { addToCart, removeFromCart, updateCartItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;
