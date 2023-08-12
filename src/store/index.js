import { configureStore } from '@reduxjs/toolkit';
import filters from './slices/filtersSlice';
import cart from './slices/cartSlice';
import pizzas from './slices/pizzasSlice';

const store = configureStore({
  reducer: { pizzas, filters, cart },
  devTools: process.env.NODE_ENV === 'development',
});

export default store;
