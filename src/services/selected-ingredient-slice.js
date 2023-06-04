import { createSlice } from '@reduxjs/toolkit';

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState: {
    selectedIngredient: null,
  },
  reducers: {
    mountIngredient: (state, action) => {
      state.selectedIngredient = action.payload;
    },

    unmountIngredient: (state) => {
      state.selectedIngredient = null;
    }
  }
});
