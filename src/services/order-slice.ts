import { checkResponse } from "../utils/check-response";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order, CurrentIngredients } from "../utils/types";
import { AppThunk } from "./store";
import { Item } from "../utils/types";

export type OrderState = {
  order: Order | null;
  loading: boolean;
  error: string | null;
};

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    fetchOrder: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchOrderSuccess: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
      console.log(action.payload);
      state.loading = false;
      state.error = null;
    },

    fetchOrderFailure: (state, action: PayloadAction<string>) => {
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

  export const placeOrder = (
    url: string,
    currentIngredients: CurrentIngredients 
  ): AppThunk => async (dispatch) => {
    if (currentIngredients.bun && currentIngredients.ingredients.length > 0) {
      const ingredients = currentIngredients.ingredients.map(
        (item: Item) => item._id
      );
      const body = {
        ingredients: [...ingredients, currentIngredients.bun._id],
      };
  
      dispatch(fetchOrder());
      try {
        const response = await fetch(`${url}/orders`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            authorization: localStorage.getItem("accessToken") || "",
          },
          body: JSON.stringify(body),
        });
  
        const data: Record<string, any> = await checkResponse(response);
        dispatch(fetchOrderSuccess(data.order));
      } catch (err) {
        dispatch(fetchOrderFailure(`Ошибка при отправке заказа: ${err}`));
        console.log(err);
      }
    }
  };
