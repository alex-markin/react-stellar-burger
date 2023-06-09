import { createSlice } from "@reduxjs/toolkit";

export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState: {
    ingredients: [],
    draggableIngredients: [],
    bun: null,
    count: {},
  },
  reducers: {
    addIngredient: (state, action) => {
      const { item, uuid } = action.payload;
      const ingredient = { ...item };

      ingredient.index = state.ingredients.length;
      ingredient.uuid = uuid;

      state.ingredients.push(ingredient);
      state.count[ingredient._id] = (state.count[ingredient._id] || 0) + 1;

    },

    removeIngredient: (state, action) => {
      const ingredient = { ...action.payload };

      state.ingredients = state.ingredients.filter(
        (item) => item.uuid !== ingredient.uuid
      );

      if (state.count[ingredient._id] > 0) {
        state.count[ingredient._id]--;
      }

      if (state.count[ingredient._id] === 0) {
        delete state.count[ingredient._id];
      }
    },

    changeBun: (state, action) => {
      if (state.bun && state.count[state.bun._id]) {
        delete state.count[state.bun._id];
      }
      state.bun = action.payload;
      state.count[action.payload._id] = 2;
    },

    reorderIngredients: (state, action) => {
      const { sourceIndex, hoverIndex } = action.payload;
      const draggedIngredient = state.ingredients[sourceIndex];

      state.ingredients.splice(sourceIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedIngredient);
    },
  },
});
