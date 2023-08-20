import { webSocketStatus } from '../../utils/web-socket-status';
import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import { wsConnecting, wsOpen, wsClose, wsError, wsMessage, wsMessageType } from './actions';

type initialStateType = {
  status: string,
  orders: Record<string, any>,
  total: number,
  totalToday: number,
  connectingError: string,
}

const initialState: initialStateType = {
  status: webSocketStatus.OFFLINE,
  orders: [],
  total: 0,
  totalToday: 0,
  connectingError: '',
}

export const ordersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(wsConnecting, (state) => {
      state.status = webSocketStatus.CONNECTING;
    })
    .addCase(wsOpen, (state) => {
      state.status = webSocketStatus.ONLINE;
    })
    .addCase(wsClose, (state) => {
      state.status = webSocketStatus.OFFLINE;
      state.orders = [];
      state.total = 0;
      state.totalToday = 0;
    })
    .addCase(wsError, (state, action: PayloadAction<string> ) => {
      state.status = webSocketStatus.OFFLINE;
      state.connectingError = action.payload;
    })
    .addCase(wsMessage, (state, action: wsMessageType) => {
      const data = action.payload;
      state.orders = data.orders;
      state.total = data.total;
      state.totalToday = data.totalToday;
    })
})

