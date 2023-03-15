import { useEffect, useState } from "react";
import { Address, OpenedContract } from "ton-core";
import { useTonClient } from "./useTonClient";
import { Invoice } from "../wrappers/Invoice";

export const useInvoice = (address: string) => {
  const tonClient = useTonClient();
  const [invoiceContract, setInvoiceContract] =
    useState<OpenedContract<Invoice> | null>(null);

  useEffect(() => {
    if (!tonClient || !address) return;

    setInvoiceContract(tonClient.open(new Invoice(Address.parse(address))));
  }, [address, tonClient]);

  return invoiceContract;
};
