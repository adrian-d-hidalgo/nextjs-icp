import { createSlice } from "@reduxjs/toolkit";
import {
  authLoadInitialState,
  logInAction,
  logOutAction,
} from "./auht.actions";

export type AuthStateType = {
  isAuthenticated: boolean;
};

const initialState: AuthStateType = {
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset(state) {
      state = initialState;
    },
    authenticate(state) {
      state.isAuthenticated = true;
    },
    deauthenticate(state) {
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAction.fulfilled, (state) => {})
      .addCase(logOutAction.fulfilled, (state) => {})
      .addCase(authLoadInitialState.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      });
  },
});

export const { authenticate, deauthenticate } = authSlice.actions;

export default authSlice.reducer;
