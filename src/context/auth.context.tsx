import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";

import { IcpContext } from "@/libs/icp";

export type AuthContextType = {};

export type AuthContextProviderType = {
  children: ReactNode;
};

export const AuthContext = createContext({} as AuthContextType);

export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
  const [loading, setLoading] = useState(true);
  const { isAuthenticated } = useContext(IcpContext);
  const router = useRouter();

  useEffect(() => {
    const { pathname } = router;
    console.log({ pathname });
    if (pathname !== "/login" && !isAuthenticated) {
      router.replace("/login");
    } else if (pathname === "/login" && isAuthenticated) {
      router.replace("/");
    }

    setLoading(false);
  }, [isAuthenticated]);

  return (
    <AuthContext.Provider value={{}}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
