import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Item } from "../utils/types";

type IngredientState = {
  ingredients: Item[],
  draggableIngredients: any[],
  bun: Item | null,
  count: Record<string, number>,
}

const initialState: IngredientState = {
  ingredients: [],
    draggableIngredients: [],
    bun: null,
    count: {},
};

type AddIngredientPayload = {
  item: Item,
  uuid: string,
}

type ReorderIngredientsPayload = {
  sourceIndex: number,
  hoverIndex: number,
}


export const ingredientsSlice = createSlice({
  name: "ingredients",
  initialState,
  reducers: {
    addIngredient: (state, action: PayloadAction<AddIngredientPayload>) => {
      const { item, uuid } = action.payload;
      const ingredient = { ...item };

      ingredient.index = state.ingredients.length;
      ingredient.uuid = uuid;

      state.ingredients.push(ingredient);
      state.count[ingredient._id] = (state.count[ingredient._id] || 0) + 1;

    },

    removeIngredient: (state, action: PayloadAction<Item>) => {
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

    changeBun: (state, action: PayloadAction<Item>) => {
      if (state.bun && state.count[state.bun._id]) {
        delete state.count[state.bun._id];
      }
      state.bun = action.payload;
      state.count[action.payload._id] = 2;
    },

    reorderIngredients: (state, action: PayloadAction<ReorderIngredientsPayload>) => {
      const { sourceIndex, hoverIndex } = action.payload;
      const draggedIngredient = state.ingredients[sourceIndex];

      state.ingredients.splice(sourceIndex, 1);
      state.ingredients.splice(hoverIndex, 0, draggedIngredient);
    },

    resetIngredients: (state) => {
      state.ingredients = [];
      state.bun = null;
      state.count = {};
    }
  },
});
