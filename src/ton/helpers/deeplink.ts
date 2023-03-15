import { Cell } from "ton-core";

export function buildTonDeeplink(
  address: string,
  amount: bigint,
  body?: Cell,
  stateInit?: Cell
) {
  return `ton://transfer/${address}?amount=${amount.toString()}${
    body ? "&bin=" + body.toBoc().toString("base64") : ""
  }${stateInit ? "&init=" + stateInit.toBoc().toString("base64") : ""}`;
}
