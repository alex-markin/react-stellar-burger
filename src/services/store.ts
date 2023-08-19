import { configureStore } from '@reduxjs/toolkit'
import { socketMiddleware } from './socket-connection/middleware/socket-middleware';
import { rootReducer } from './root-reducer';
import { ThunkAction } from "redux-thunk";
import { Action } from "redux";
import {
  connect as ordersSocketConnect,
  disconnect as ordersSocketDisconnect,
  wsOpen as ordersSocketWsOpen,
  wsClose as ordersSocketWsClose,
  wsMessage as ordersSocketWsMessage,
  wsError as ordersSocketWsError,
  wsConnecting as ordersSocketWsConnecting,
} from './socket-connection/actions';



const orderFeedMiddleware = socketMiddleware({
  wsConnect: ordersSocketConnect,
  wsDisconnect: ordersSocketDisconnect,
  wsConnecting: ordersSocketWsConnecting,
  onOpen: ordersSocketWsOpen,
  onClose: ordersSocketWsClose,
  onError: ordersSocketWsError,
  onMessage: ordersSocketWsMessage,
})

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(orderFeedMiddleware)
})

export default store;

export type RootState = ReturnType<typeof store.getState>

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>