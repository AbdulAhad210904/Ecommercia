import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCategoryData = createAsyncThunk(
  'categories/getCategoryData',
  async (_, thunkAPI) => {
    try {
      const response = await axios.get('https://api.escuelajs.co/api/v1/categories');
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
