import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { AuthContextProvider } from "@/context/auth.context";
import { store } from "@/store/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <AuthContextProvider>
        <Component {...pageProps} />
      </AuthContextProvider>
    </Provider>
  );
}
