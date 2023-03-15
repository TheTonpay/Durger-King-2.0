import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import Head from "next/head";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Image from "next/image";
import TonLogo from "@/TonLogo";
import { useRouter } from "next/router";
import useSender from "@/ton/hooks/useSender";
import { useStore } from "@/ton/hooks/useStore";
import { toNano } from "ton-core";
import { useTonWallet } from "@tonconnect/ui-react";
import { useAccountEventStream } from "@/ton/hooks/useAccountEventStream";

export default function CheckoutPage() {
  const theme = useTheme();
  const router = useRouter();
  const { sender } = useSender();
  const storeAddress = "EQBoUTnpsxUNX_6RZTy2dgDFimJUL8cuIZwQjHb5OFlwh8pm"; // hardcoded merchant's store address
  const store = useStore(storeAddress);
  const wallet = useTonWallet();

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {
    if (!localStorage) return;

    setCart(JSON.parse(localStorage.getItem("cart") || "[]"));
  }, [localStorage]);

  const { startListening, stopListening } = useAccountEventStream(
    storeAddress,
    (event) => {
      const deployEvent = event.actions.find(
        (action: any) => action.type == "ContractDeploy"
      );
      if (deployEvent) {
        window.location.href = `https://beta.pay.thetonpay.app/i/${deployEvent.ContractDeploy.address}`;
      }
    }
  );

  return (
    <>
      <Head>
        <title>Durger King 2.0 - Checkout</title>
        <meta name="description" content="Durger King reborn - pay with TON" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Box p={2} pb={theme.spacing(8)}>
        <Toolbar />

        <Typography variant="h5" gutterBottom>
          <IconButton
            onClick={() => {
              router.back();
            }}
          >
            <ArrowBackIcon />
          </IconButton>
          Checkout
        </Typography>

        {cart.map((product) => (
          <Box
            key={product.name}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 2,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center" }} gap={2}>
              <Image
                src={`/${product.image}`}
                width={96}
                height={96}
                alt={product.name}
              />
              <Typography variant="h6">
                {product.name} x {product.quantity}
              </Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center" }} gap={1}>
              <Typography variant="h6">
                {Math.round(product.price * product.quantity * 100) / 100}{" "}
              </Typography>
              <TonLogo
                width={theme.spacing(3)}
                height={theme.spacing(3)}
                fill="#0088CC"
              />
            </Box>
          </Box>
        ))}
      </Box>

      <Button
        variant="contained"
        disabled={!sender || !store || !wallet}
        sx={{
          position: "fixed",
          width: "auto",
          bottom: theme.spacing(1),
          left: theme.spacing(1),
          right: theme.spacing(1),
          height: theme.spacing(6),
          color: "white",
        }}
        onClick={async () => {
          if (!sender || !store || !wallet) return;

          await store.sendRequestPurchase(sender, {
            value: toNano("0.02"),
            invoice_id: Date.now().toString(),
            amount: toNano(
              cart
                .reduce((acc, product) => {
                  return acc + product.price * product.quantity;
                }, 0)
                .toString()
            ),
          });

          startListening();
        }}
      >
        Confirm order
      </Button>
    </>
  );
}
