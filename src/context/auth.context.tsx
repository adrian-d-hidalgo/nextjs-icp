import { ReactNode, createContext } from "react";
import { useDispatch, useSelector } from "react-redux";

import { AppDispatch, AppState } from "@/store/store";
import { logInAction, logOutAction } from "@/store/auth/auht.actions";

export type AuthType = {
  logIn: () => void | undefined;
  logOut: () => void;
};

export type AuthContextType = {
  isAuthenticated: boolean;
  logIn: () => any;
  logOut: () => any;
};

export type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const dispatch = useDispatch<AppDispatch>();
  const { isAuthenticated } = useSelector((state: AppState) => state.auth);

  function logIn() {
    dispatch(logInAction());
  }

  function logOut() {
    dispatch(logOutAction());
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
