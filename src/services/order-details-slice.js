import { createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";

export const orderDetailsSlice = createSlice({
  name: "orderDetails",
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

    fetchOrdeSuccess: (state, action) => {
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
    }

  },

});

export const { fetchOrder, fetchOrdeSuccess, resetOrder, fetchOrderFailure } = orderDetailsSlice.actions;

export const getOrders = (id) => (dispatch) => {
  dispatch(fetchOrder());
  return api.getOrder(id)
    .then((data) => {
      dispatch(fetchOrdeSuccess(data.orders[0]));
    })
    .catch((err) => {
      console.log(err);
      fetchOrderFailure(err);
    });
}



