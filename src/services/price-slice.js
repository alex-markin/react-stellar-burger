import { createSlice } from '@reduxjs/toolkit';

export const priceSlice = createSlice({
  name: 'price',
  initialState: {
    totalPrice: 0
  },
  reducers: {
    addIngredient: (state, action) => {
      state.totalPrice += action.payload;
    },
    removeIngredient: (state, action) => {
      state.totalPrice -= action.payload;
    },
    resetIngredients: state => {
      state.totalPrice = 0;
    }
  }
});


