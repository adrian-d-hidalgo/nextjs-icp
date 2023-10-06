import { AppProps } from "next/app";

import { IcpContextProvider } from "@/libs/icp";
import { AuthContextProvider } from "@/context/auth.context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IcpContextProvider>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </IcpContextProvider>
  );
}
