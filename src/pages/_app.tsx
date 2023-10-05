import { AppProps } from "next/app";
import { Provider } from "react-redux";
import { ThemeProvider, createTheme } from "@mui/material";

import { AuthContextProvider } from "@/context/auth.context";

export default function App({ Component, pageProps }: AppProps) {
  const defaultTheme = createTheme();

  return (
    <AuthContextProvider>
      <ThemeProvider theme={defaultTheme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </AuthContextProvider>
  );
}
