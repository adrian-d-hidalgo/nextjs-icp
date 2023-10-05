// file: store.ts
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";

// We'll use redux-logger just as an example of adding another middleware
import logger from "redux-logger";

// And use redux-batched-subscribe as an example of adding enhancers
// import { batchedSubscribe } from "redux-batched-subscribe";

import authReducer from "./auth/auth.reducer";
import { authLoadInitialState } from "./auth/auht.actions";

const reducer = {
  auth: authReducer,
};

const preloadedState = {
  auth: {
    isAuthenticated: false, // Get State from store
  },
};

export type AppDispatch = typeof store.dispatch;
export type AppState = typeof preloadedState;

// const debounceNotify = _.debounce((notify) => notify());

export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(thunk, logger),
  devTools: process.env.NODE_ENV !== "production",
  preloadedState,
  //   enhancers: [batchedSubscribe(debounceNotify)],
});

store.dispatch(authLoadInitialState()); //TODO: Check if there is a better way to do this
