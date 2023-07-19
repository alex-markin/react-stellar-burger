import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom';
import { socketMiddleware } from './services/socket-connection/middleware/socket-middleware';
import { rootReducer } from './services/root-reducer'
import {
  connect as ordersSocketConnect,
  disconnect as ordersSocketDisconnect,
  wsOpen as  ordersSocketWsOpen,
  wsClose as ordersSocketWsClose,
  wsMessage as ordersSocketWsMessage,
  wsError as ordersSocketWsError,
  wsConnecting as ordersSocketWsConnecting,
} from './services/socket-connection/actions';





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


ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Provider store={store}>
      <App />
    </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
