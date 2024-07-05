import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchAllProducts = createAsyncThunk(
  'products/fetchAllProducts',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  'products/fetchProductsByCategory',
  async (categoryId, thunkAPI) => {
    try {
      const response = await axios.get(`https://api.escuelajs.co/api/v1/categories/${categoryId}/products`);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
