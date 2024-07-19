import { createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCart, updateCartQuantity, deleteCartItem, clearCart } from './cartThunk';

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
  lastUpdated: null,
  counter: Number(localStorage.getItem('cartCounter')) || 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addToCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.lastUpdated = new Date().toISOString();
        //check if same item is already in cart
        if (state.cartItems.items.length === state.counter) {
          state.counter = state.counter;
        } else {
          state.counter += 1; 
          localStorage.setItem('cartCounter', state.counter);
        }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.counter = state.cartItems.length; // Update counter based on cartItems length
        localStorage.setItem('cartCounter', state.counter);
      })
      .addCase(fetchCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(updateCartQuantity.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.counter = state.cartItems.length; // Update counter based on cartItems length
        localStorage.setItem('cartCounter', state.counter);
      })
      .addCase(updateCartQuantity.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(deleteCartItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.cartItems = action.payload;
        state.loading = false;
        state.counter = state.cartItems.length; // Update counter based on cartItems length
        localStorage.setItem('cartCounter', state.counter);
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      })
      .addCase(clearCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(clearCart.fulfilled, (state) => {
        state.cartItems = [];
        state.loading = false;
        state.counter = 0;
        localStorage.setItem('cartCounter', 0);
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default cartSlice.reducer;
