import { createSlice } from '@reduxjs/toolkit';
import { addToCart, fetchCart, updateCartQuantity, deleteCartItem, clearCart } from './cartThunk';

const initialState = {
  cartItems: [],
  error: null,
  loading: false,
  lastUpdated: null,
  counter: 0,
};

// Helper function to safely access localStorage
const getLocalStorageCounter = () => {
  if (typeof window !== 'undefined') {
    return Number(localStorage.getItem('cartCounter')) || 0;
  }
  return 0;
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    ...initialState,
    counter: getLocalStorageCounter(),
  },
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
        if (typeof window !== 'undefined') {
          // Update counter and localStorage only on the client side
          if (state.cartItems.items.length === state.counter) {
            state.counter = state.counter;
          } else {
            state.counter += 1;
            localStorage.setItem('cartCounter', state.counter);
          }
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
        if (typeof window !== 'undefined') {
          // Update counter and localStorage only on the client side
          state.counter = state.cartItems.length;
          localStorage.setItem('cartCounter', state.counter);
        }
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
        if (typeof window !== 'undefined') {
          // Update counter and localStorage only on the client side
          state.counter = state.cartItems.length;
          localStorage.setItem('cartCounter', state.counter);
        }
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
        if (typeof window !== 'undefined') {
          // Update counter and localStorage only on the client side
          state.counter = state.cartItems.length;
          localStorage.setItem('cartCounter', state.counter);
        }
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
        if (typeof window !== 'undefined') {
          // Update localStorage only on the client side
          localStorage.setItem('cartCounter', 0);
        }
      })
      .addCase(clearCart.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  }
});

export default cartSlice.reducer;
