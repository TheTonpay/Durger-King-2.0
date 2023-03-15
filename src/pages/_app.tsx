import "@/styles/globals.css";
import {
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  createTheme,
} from "@mui/material";
import { TonConnectUIProvider } from "@tonconnect/ui-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // temp manifest for demo purposes
  const manifestUrl =
    "https://raw.githubusercontent.com/TheTonpay/Durger-King-2.0/main/tonconnect-manifest.json";

  const theme: ThemeOptions = createTheme({
    palette: {
      mode: "light",
      primary: {
        main: "#F17A40",
      },
      secondary: {
        main: "#40B7F1",
      },
      error: {
        main: "#ba1a1a",
      },
    },
    shape: {
      borderRadius: 8,
    },
  });
  return (
    <>
      <CssBaseline enableColorScheme />

      <ThemeProvider theme={theme}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <Component {...pageProps} />
        </TonConnectUIProvider>
      </ThemeProvider>
    </>
  );
}
