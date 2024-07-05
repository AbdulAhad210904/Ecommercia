import { createSlice } from '@reduxjs/toolkit';
import { getCategoryData } from './categoryThunk';

const initialState = {
  categories: [],
  loading: true,
  error: null
};

const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCategoryData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCategoryData.fulfilled, (state, action) => {
        state.loading = false;
        state.categories = action.payload;
      })
      .addCase(getCategoryData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export default categorySlice.reducer;
