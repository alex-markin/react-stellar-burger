import { webSocketStatus } from '../../utils/web-socket-status';
import { createReducer } from '@reduxjs/toolkit';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage } from './actions';

const initialState = {
  status: webSocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: '',

}

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state, action) => {
      state.status = webSocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state, action) => {
      state.status = webSocketStatus.ONLINE;
    })
    .addCase(wsClose, (state, action) => {
      state.status = webSocketStatus.OFFLINE;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    })
    .addCase(wsError, (state, action) => {
      state.status = webSocketStatus.OFFLINE;
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action) => {
      const data = action.payload;
      state.orders = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    })
})

