import { createAction } from '@reduxjs/toolkit';

export type wsMessageType = {
  type: string;
  payload: Record<string, any>;
}

// Actions for order feed
export const connect = createAction<string>('ORDER_FEED_CONNECT');
export const disconnect = createAction<void>('ORDER_FEED_DISCONNECT');
export const wsConnecting = createAction<void>('ORDER_FEED_WS_CONNECTING');
export const wsOpen = createAction<void>('ORDER_FEED_WS_OPEN');
export const wsClose = createAction<void>('ORDER_FEED_WS_CLOSE');
export const wsMessage = createAction<wsMessageType>('ORDER_FEED_WS_MESSAGE');
export const wsError = createAction<string>('ORDER_FEED_WS_ERROR'); 

export type wsActionsType = {
  wsConnect: typeof connect,
  wsDisconnect: typeof disconnect,
  wsConnecting: typeof wsConnecting,
  onOpen:typeof wsOpen,
  onClose: typeof wsClose,
  onError: typeof wsError,
  onMessage: typeof wsMessage,
}