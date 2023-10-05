import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { AuthClient } from "@dfinity/auth-client";
import { AuthStateType, authenticate, deauthenticate } from "./auth.reducer";

export const authResetAction = createAction("auth/reset-tracked-loading-state");

export const authLoadInitialState = createAsyncThunk(
  "auth/load-initial-state",
  async (): Promise<AuthStateType> => {
    try {
      const auth = await AuthClient.create();
      const state = { isAuthenticated: await auth.isAuthenticated() };
      return state;
    } catch (error) {
      throw error;
    }
  }
);

export const logInAction = createAsyncThunk(
  "auth/log-in",
  async (_, thunkAPI) => {
    try {
      const auth = await AuthClient.create();
      await auth.login({
        onSuccess: () => {
          thunkAPI.dispatch(authenticate());
        },
      });
    } catch (error) {
      throw error;
    }
  }
);

export const logOutAction = createAsyncThunk(
  "auth/log-out",
  async (_, thunkAPI) => {
    try {
      const auth = await AuthClient.create();
      await auth.logout();
      thunkAPI.dispatch(deauthenticate());
    } catch (error) {
      throw error;
    }
  }
);
