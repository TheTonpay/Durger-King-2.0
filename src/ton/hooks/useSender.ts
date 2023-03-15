import { useTonConnectUI } from "@tonconnect/ui-react";
import { SenderArguments, beginCell, storeStateInit } from "ton-core";

export default function useSender() {
  const [tonConnectUi] = useTonConnectUI();

  return {
    sender: {
      send: async ({ to, value, body, init }: SenderArguments) => {
        tonConnectUi?.sendTransaction({
          messages: [
            {
              address: to.toString(),
              amount: value.toString(),
              payload: body?.toBoc().toString("base64"),
              stateInit: init
                ? beginCell()
                    .storeWritable(storeStateInit(init))
                    .endCell()
                    .toBoc()
                    .toString("base64")
                : undefined,
            },
          ],
          validUntil: Date.now() + 5 * 60 * 1000,
        });
      },
      connected: tonConnectUi?.connected,
    },
  };
}
