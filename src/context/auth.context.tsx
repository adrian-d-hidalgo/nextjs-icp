import { ReactNode, createContext, useEffect, useState } from "react";
import { AuthClient } from "@dfinity/auth-client";

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
  publicRoutes?: Array<string>;
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({
  children,
  publicRoutes = [],
}: AuthContextProviderType) => {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  async function getAuthtenticationStatus() {
    try {
      const auth = await AuthClient.create();
      const isAuthenticated = await auth.isAuthenticated();
      setIsAuthenticated(isAuthenticated);
      setLoading(false);
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
        isAuthenticated,
        logIn,
        logOut,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
