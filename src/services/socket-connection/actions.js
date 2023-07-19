import { createAction } from '@reduxjs/toolkit';

// actons для
export const connect = createAction('ORDER_FEED_CONNECT')
export const disconnect = createAction('ORDER_FEED_DISCONNECT');
export const wsConnecting = createAction('ORDER_FEED_WS_CONNECTING');
export const wsOpen = createAction('ORDER_FEED_WS_OPEN');
export const wsClose = createAction('ORDER_FEED_WS_CLOSE');
export const wsMessage = createAction('ORDER_FEED_WS_MESSAGE');
export const wsError = createAction('ORDER_FEED_WS_ERROR');
