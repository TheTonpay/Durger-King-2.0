import "@/styles/globals.css";
import {
  AppBar,
  Box,
  CssBaseline,
  ThemeOptions,
  ThemeProvider,
  Toolbar,
  Typography,
  createTheme,
  useTheme,
} from "@mui/material";
import { TonConnectButton, TonConnectUIProvider } from "@tonconnect/ui-react";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  // temp manifest for demo purposes
  const manifestUrl =
    "https://raw.githubusercontent.com/TheTonpay/Durger-King-2.0/main/tonconnect-manifest.json";

  const themeOptions: ThemeOptions = createTheme({
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

      <ThemeProvider theme={themeOptions}>
        <TonConnectUIProvider manifestUrl={manifestUrl}>
          <Box
            sx={{
              width: "100%",
              height: "100%",
            }}
          >
            <AppBar
              sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
              color="primary"
              enableColorOnDark
            >
              <Toolbar>
                <Typography
                  variant="h5"
                  sx={{ flexGrow: 1, fontWeight: "bold", color: "white" }}
                >
                  Durger King 2.0
                </Typography>

                <TonConnectButton />
              </Toolbar>
            </AppBar>

            <Component {...pageProps} />
          </Box>
        </TonConnectUIProvider>
      </ThemeProvider>
    </>
  );
}
