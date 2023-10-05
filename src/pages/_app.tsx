import { AppProps } from "next/app";

import { IcpContextProvider } from "@/libs/icp";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <IcpContextProvider>
      <Component {...pageProps} />
    </IcpContextProvider>
  );
}
