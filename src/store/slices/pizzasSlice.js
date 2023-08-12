import axios from 'axios';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const initialState = {
  items: [],
  status: 'loading',
};

export const fetchPizzas = createAsyncThunk('pizzas/fetchPizzasStatus', async (params) => {
  const { page, property, order, search, category } = params;
  const { data } = await axios.get(
    `https://64c92e89b2980cec85c20458.mockapi.io/items?${page}&sortBy=${property}&order=${order}${search}${category}`,
  );

  return data;
});

const pizzasSlice = createSlice({
  name: 'pizzas',
  initialState,
  extraReducers: {
    [fetchPizzas.pending]: (state) => {
      state.status = 'loading';
      state.items = [];
    },
    [fetchPizzas.fulfilled]: (state, action) => {
      state.status = 'success';
      state.items = action.payload;
    },
    [fetchPizzas.rejected]: (state) => {
      state.status = 'error';
      state.items = [];
    },
  },
});

export default pizzasSlice.reducer;
