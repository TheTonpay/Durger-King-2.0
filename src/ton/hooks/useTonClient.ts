import { getHttpEndpoint } from "@orbs-network/ton-access";
import { TonClient } from "ton";
import { useEffect, useState } from "react";

export function useTonClient() {
  const [tonClient, setTonClient] = useState<TonClient | null>(null);

  useEffect(() => {
    const buildClient = async () => {
      const endpoint = await getHttpEndpoint({
        network: "testnet",
      });

      return new TonClient({ endpoint: endpoint });
    };

    buildClient().then((client) => {
      setTonClient(client);
    });
  }, []);

  return tonClient;
}
