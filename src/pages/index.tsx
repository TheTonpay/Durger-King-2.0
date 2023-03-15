import Head from "next/head";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import { TonConnectButton } from "@tonconnect/ui-react";

export default function Home() {
  return (
    <>
      <Head>
        <title>Durger King 2.0</title>
        <meta name="description" content="Durger King reborn - pay with TON" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box>
        <AppBar
          position="fixed"
          sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
          color="primary"
          enableColorOnDark
        >
          <Toolbar>
            <Typography
              variant="h5"
              sx={{ flexGrow: 1, fontWeight: "bold", color: "primary.text" }}
            >
              Durger King 2.0
            </Typography>

            <TonConnectButton />
          </Toolbar>
        </AppBar>
      </Box>
    </>
  );
}
