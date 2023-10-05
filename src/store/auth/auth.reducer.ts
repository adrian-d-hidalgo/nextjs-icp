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
    authResetAction(state) {
      state = initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(logInAction.fulfilled, (state) => {
        state.isAuthenticated = true;
      })
      .addCase(logOutAction.fulfilled, (state) => {
        state.isAuthenticated = false;
      })
      .addCase(authLoadInitialState.fulfilled, (state, action) => {
        state.isAuthenticated = action.payload.isAuthenticated;
      });
  },
});

export default authSlice.reducer;
