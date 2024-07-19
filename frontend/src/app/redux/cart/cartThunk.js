import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ userId, productData }, thunkAPI) => {
    try {
      console.log("productData", productData);
      const response = await axios.post('http://localhost:8080/api/add', { userId, ...productData });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/api/getcart', { userId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const updateCartQuantity = createAsyncThunk(
  'cart/updateCartQuantity',
  async ({ userId, itemId, quantity }, thunkAPI) => {
    try {
      const response = await axios.put(`http://localhost:8080/api/update/${itemId}`, { userId, quantity });
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const deleteCartItem = createAsyncThunk(
  'cart/deleteCartItem',
  async ({ userId, itemId }, thunkAPI) => {
    try {
      const response = await axios.delete(`http://localhost:8080/api/delete/${itemId}`, { data: { userId } });
      return response.data.items;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (userId, thunkAPI) => {
    try {
      const response = await axios.post('http://localhost:8080/api/clearcart', { userId });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
