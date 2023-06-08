import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    draggableIngredients: [],
    bun: null,
    count: {},
    totalPrice: 0,
  },
  reducers: {
    addIngredient: (state, action) => {
      const ingredient = { ...action.payload };

      ingredient.index = state.ingredients.length;
      state.count[ingredient._id] == null && state.ingredients.push(ingredient);
      state.count[ingredient._id] = state.count[ingredient._id]
        ? state.count[ingredient._id] + 1
        : 1;
      state.totalPrice += ingredient.price;
    },

    removeIngredient: (state, action) => {
      const ingredient = { ...action.payload };

      if (state.count[ingredient._id] === 1) {
        state.ingredients = state.ingredients.filter(
          (item) => item._id !== ingredient._id
        );
        delete state.count[ingredient._id];
        state.totalPrice -= ingredient.price;
      } else {
        state.count[ingredient._id] = state.count[ingredient._id]
          ? state.count[ingredient._id] - 1
          : 0;
        state.totalPrice -= ingredient.price;
      }
    },

    changeBun: (state, action) => {
      if (state.bun && state.count[state.bun._id]) {
        state.totalPrice -= state.bun.price * state.count[state.bun._id];
        delete state.count[state.bun._id];
      }
      state.bun = action.payload;
      state.count[action.payload._id] = 2;
      state.totalPrice += action.payload.price * state.count[state.bun._id];
    },

    reorderIngredients: (state, action) => {
      const { sourceIndex, targetIndex } = action.payload;
      const draggedIngredient = state.ingredients[sourceIndex];

      state.ingredients.splice(sourceIndex, 1);
      state.ingredients.splice(targetIndex, 0, draggedIngredient);
    },
  },
});
