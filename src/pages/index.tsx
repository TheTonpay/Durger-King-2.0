import Head from "next/head";
import {
  AppBar,
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import { TonConnectButton } from "@tonconnect/ui-react";
import { products } from "@/products";
import TonLogo from "@/TonLogo";
import { useReducer } from "react";

export default function Home() {
  const theme = useTheme();

  type Action =
    | { type: "ADD_PRODUCT"; product: any }
    | { type: "REMOVE_PRODUCT"; name: string };

  const updateCart = (cart: any[], action: Action) => {
    switch (action.type) {
      case "ADD_PRODUCT": {
        const existingProduct = cart.find(
          (p: any) => p.name === action.product.name
        );
        if (existingProduct) {
          return cart.map((p: any) =>
            p.name === action.product.name
              ? { ...p, quantity: p.quantity + 1 }
              : p
          );
        } else {
          return [...cart, { ...action.product, quantity: 1 }];
        }
      }
      case "REMOVE_PRODUCT": {
        const index = cart.findIndex((p: any) => p.name === action.name);
        if (index !== -1) {
          const product = cart[index];
          if (product.quantity > 1) {
            return [
              ...cart.slice(0, index),
              { ...product, quantity: product.quantity - 1 },
              ...cart.slice(index + 1),
            ];
          } else {
            return [...cart.slice(0, index), ...cart.slice(index + 1)];
          }
        } else {
          return cart;
        }
      }
      default:
        throw new Error(`Invalid action type ${action}`);
    }
  };

  const [cart, setCart] = useReducer(updateCart, []);

  return (
    <>
      <Head>
        <title>Durger King 2.0</title>
        <meta name="description" content="Durger King reborn - pay with TON" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

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

        <Box p={2} pb={theme.spacing(8)}>
          <Toolbar />
          <Grid container spacing={2}>
            {products.map((product) => (
              <>
                <Grid item xs={6} sm={6} md={2} lg={2} key={product.name}>
                  <Badge
                    badgeContent={
                      cart.find((p: any) => p.name === product.name)?.quantity
                    }
                    color="primary"
                    sx={{
                      "& .MuiBadge-badge": {
                        color: "white",
                      },
                    }}
                  >
                    <Card>
                      <CardMedia
                        component="img"
                        image={product.image}
                        sx={{
                          p: 3,
                        }}
                      />

                      <CardContent
                        sx={{
                          py: "8px !important",
                        }}
                      >
                        <Typography
                          variant="body1"
                          sx={{
                            verticalAlign: "middle",
                          }}
                        >
                          {product.name} - <b>{product.price}</b>{" "}
                          <TonLogo
                            width={theme.spacing(2)}
                            height={theme.spacing(2)}
                            fill={"#0088CC"}
                          />
                        </Typography>
                      </CardContent>

                      <CardActions>
                        {cart.find((p: any) => p.name === product.name) ? (
                          <>
                            <Button
                              onClick={() =>
                                setCart({
                                  type: "REMOVE_PRODUCT",
                                  name: product.name,
                                })
                              }
                              variant="outlined"
                              sx={{
                                height: theme.spacing(4),
                                width: "50%",
                                fontWeight: "bold",
                              }}
                            >
                              -
                            </Button>

                            <Button
                              onClick={() =>
                                setCart({
                                  type: "ADD_PRODUCT",
                                  product: product,
                                })
                              }
                              variant="outlined"
                              sx={{
                                height: theme.spacing(4),
                                width: "50%",
                                fontWeight: "bold",
                              }}
                            >
                              +
                            </Button>
                          </>
                        ) : (
                          <Button
                            onClick={() =>
                              setCart({
                                type: "ADD_PRODUCT",
                                product: product,
                              })
                            }
                            variant="outlined"
                          >
                            Add to cart
                          </Button>
                        )}
                      </CardActions>
                    </Card>
                  </Badge>
                </Grid>
              </>
            ))}
          </Grid>
        </Box>

        <Button
          variant="contained"
          sx={{
            position: "fixed",
            right: theme.spacing(1),
            left: theme.spacing(1),
            height: theme.spacing(6),
            width: "auto",
            color: "white",
            bottom: theme.spacing(1),
          }}
          onClick={() => {
            console.log(cart);
          }}
        >
          Checkout - {cart.length} items for{" "}
          {Math.round(
            cart.reduce(
              (acc: number, p: any) => acc + p.price * p.quantity,
              0
            ) * 100
          ) / 100}
          TON
        </Button>
      </Box>
    </>
  );
}
