import { useEffect, useState } from "react";
import { Address, OpenedContract } from "ton-core";
import { Store } from "../wrappers/Store";
import { useTonClient } from "./useTonClient";

export const useStore = (address: string) => {
  const tonClient = useTonClient();
  const [storeContract, setStoreContract] =
    useState<OpenedContract<Store> | null>(null);

  useEffect(() => {
    if (!tonClient || !address) return;

    setStoreContract(tonClient.open(new Store(Address.parse(address))));
  }, [address, tonClient]);

  return storeContract;
};
