import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "@/services/auth";
import { AuthStateType } from "./auth.reducer";

export const authResetAction = createAction("auth/reset-tracked-loading-state");

export const authLoadInitialState = createAsyncThunk(
  "auth/load-initial-state",
  async (): Promise<AuthStateType> => {
    const auth = await Auth.getInstance();
    try {
      const state = { isAuthenticated: await auth.isAuthenticated() };
      return state;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

export const logInAction = createAsyncThunk("auth/log-in", async () => {
  const auth = await Auth.getInstance();
  try {
    await auth.logIn();
  } catch (error) {
    console.log(error);
    throw error;
  }
});

export const logOutAction = createAsyncThunk("auth/log-out", async () => {
  const auth = await Auth.getInstance();
  try {
    await auth.logOut();
  } catch (error) {
    console.log(error);
    throw error;
  }
});
