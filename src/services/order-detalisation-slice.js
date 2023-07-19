import { createSlice } from "@reduxjs/toolkit";
import { api } from "../utils/api";

export const orderDetalisationSlice = createSlice({
  name: "orderDetalisation",
  initialState: {
    order: null,
    loading: false,
    error: null,
  },
  reducers: {
    fetchOrderDetalisation: (state) => {
      state.loading = true;
      state.error = null;
    },

    fetchOrderDetalisationSuccess: (state, action) => {
      state.order = action.payload;
      state.loading = false;
      state.error = null;
    },

    fetchOrderDetalisationFailure: (state, action) => {
      state.order = null;
      state.loading = false;
      state.error = action.payload;
    },

    resetOrderDetalisation: (state) => {
      state.order = null;
      state.loading = false;
      state.error = null;
    }

  },

});

export const { fetchOrderDetalisation, fetchOrderDetalisationSuccess, resetOrderDetalisation } = orderDetalisationSlice.actions;

export const getOrders = (id) => (dispatch) => {
  dispatch(fetchOrderDetalisation());
  return api.getOrder(id)
    .then((data) => {
      dispatch(fetchOrderDetalisationSuccess(data.orders[0]));
    })
    .catch((err) => {
      console.log(err);
    });
}



