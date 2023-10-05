import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

export type AuthType = {
  logIn: () => void | undefined;
  logOut: () => void;
};

export type AuthContextType = {
  // initialStateIsLoading: boolean;
  isAuthenticated: boolean;
  logIn: () => any;
  logOut: () => any;
};

export type AuthContextProviderType = {
  protectedRoutes?: Array<string>;
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getAuthtenticationStatus() {
    try {
      const auth = await AuthClient.create();
      const isAuthenticated = await auth.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
    } catch (error) {
      throw error;
    }
  }

  useEffect(() => {
    getAuthtenticationStatus();
  });

  async function logIn() {
    try {
      const auth = await AuthClient.create();
      await auth.login({
        onSuccess: () => {
          setIsAuthenticated(true);
        },
        onError: () => {
          console.log("Hubo un error al hacer login");
        },
      });
    } catch (error) {
      throw error;
    }
  }

  async function logOut() {
    try {
      const auth = await AuthClient.create();
      await auth.logout();
      setIsAuthenticated(false);
    } catch (error) {
      throw error;
    }
  }

  return (
    <AuthContext.Provider
      value={{
        // initialStateIsLoading,
        isAuthenticated,
        logIn,
        logOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
