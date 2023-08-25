import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Order } from "../utils/types";
import { OrderState } from "./order-slice";
import { AppThunk } from "./store";
import { api } from "../utils/api";

const initialState: OrderState = {
  order: null,
  loading: false,
  error: null,
};

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
  initialState,
  reducers: {
    fetchOrder: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchOrdeSuccess: (state, action: PayloadAction<Order>) => {
      state.order = action.payload;
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
    }

  },

});

export const { fetchOrder, fetchOrdeSuccess, resetOrder, fetchOrderFailure } = orderDetailsSlice.actions;

export const getOrders = (id: string): AppThunk => async (dispatch) => {
  dispatch(fetchOrder());
  try {
    const data = await api.getOrder(id);
    data ? dispatch(fetchOrdeSuccess(data.orders[0])): dispatch(fetchOrderFailure("Ошибка при получении данных"));
  } catch (err: any) {
    console.log(err);
    dispatch(fetchOrderFailure(err));
  }
};



