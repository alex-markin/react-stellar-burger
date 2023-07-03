import { checkResponse } from "../utils/check-response.js";
import { createSlice } from "@reduxjs/toolkit";

export const orderSlice = createSlice({
  name: "data",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrder: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchOrderSuccess: (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchOrderFailure: (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = action.payload;
    },

    resetOrder: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    },
  },
});

export const { fetchOrder, fetchOrderSuccess, fetchOrderFailure } =
  orderSlice.actions;

export const placeOrder = (url, currentIngredients) => (dispatch) => {
  if (currentIngredients.bun && currentIngredients.ingredients.length > 0) {
    const ingredients = currentIngredients.ingredients.map((item) => item._id);
    const body = {
      ingredients: [...ingredients, currentIngredients.bun._id],
    };

    dispatch(fetchOrder());
    return fetch(`${url}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then(checkResponse)
      .then((data) => {
        dispatch(fetchOrderSuccess(data.order));
      })
      .catch((err) => {
        dispatch(fetchOrderFailure(`Ошибка при отправке заказа: ${err}`));
        console.log(err);
      });
  }
};
