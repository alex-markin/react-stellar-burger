import { createSlice } from '@reduxjs/toolkit';


export const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState: {
    ingredients: [],
    bun: null,
  },
  reducers: {
    addIngredient: (state, action) => {
      state.ingredients.push(action.payload);
    },

    removeIngredient: (state, action) => {
      state.ingredients = state.ingredients.filter((item) => item._id !== action.payload._id);
    },

    changeBun: (state, action) => {
      state.bun = action.payload;
    }
  }
});

