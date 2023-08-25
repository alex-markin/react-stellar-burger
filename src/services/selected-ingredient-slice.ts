import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Item } from '../utils/types';

type SelectedIngredientState = {
  selectedIngredient: Item | null,
}

const initialState: SelectedIngredientState = {
  selectedIngredient: null,
};

export const selectedIngredientSlice = createSlice({
  name: 'selectedIngredient',
  initialState,
  reducers: {
    mountIngredient: (state, action: PayloadAction<Item>) => {
      state.selectedIngredient = action.payload;
    },

    unmountIngredient: (state) => {
      state.selectedIngredient = null;
    }
  }
});
