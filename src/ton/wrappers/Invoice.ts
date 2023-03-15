import {
  Address,
  beginCell,
  Cell,
  comment,
  Contract,
  contractAddress,
  ContractProvider,
  Sender,
  SendMode,
} from "ton-core";

export const InvoiceOpCodes = {
  EDIT_INVOICE: 0x48c504f3,
  DEACTIVATE_INVOICE: 0x1cc0b11e,
  PAY_INVOICE: 0xf53a02d3,
};

export const InvoiceExitCodes = {
  INVOICE_DEACTIVATED: 0xf001,
  INVOICE_ALREADY_PAID: 0xf002,
  NOT_ENOUGH_TONS: 0xf003,
  INVALID_CUSTOMER: 0xf004,
};

export type InvoiceConfig = {
  store: string;
  merchant: string;
  beneficiary: string;
  customer: string;
  invoiceId: string;
  amount: number;
  paid: boolean;
  active: boolean;
};

export type InvoiceData = {
  store: string;
  merchant: string;
  beneficiary: string;
  customer: string;
  invoiceId: string;
  amount: number;
  paid: boolean;
  active: boolean;
};

export function invoiceConfigToCell(config: InvoiceConfig): Cell {
  const cell = beginCell()
    .storeAddress(Address.parse(config.store))
    .storeAddress(Address.parse(config.merchant))
    .storeAddress(Address.parse(config.beneficiary))
    .storeRef(
      beginCell().storeAddress(Address.parse(config.customer)).endCell()
    )
    .storeRef(
      beginCell().storeSlice(comment(config.invoiceId).asSlice()).endCell()
    )
    .storeUint(config.amount, 64)
    .storeInt(config.paid ? -1 : 0, 2)
    .storeInt(config.active ? -1 : 0, 2)
    .endCell();
  return cell;
}

export class Invoice implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new Invoice(address);
  }

  static createFromConfig(config: InvoiceConfig, code: Cell, workchain = 0) {
    const data = invoiceConfigToCell(config);
    const init = { code, data };
    return new Invoice(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendEditInvoice(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      customer: string;
      invoiceId: string;
      amount: bigint;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(InvoiceOpCodes.EDIT_INVOICE, 32)
        .storeUint(0, 64)
        .storeRef(
          beginCell().storeAddress(Address.parse(opts.customer)).endCell()
        )
        .storeRef(comment(opts.invoiceId))
        .storeUint(opts.amount, 64)
        .endCell(),
    });
  }

  async sendDeactivateInvoice(
    provider: ContractProvider,
    via: Sender,
    value: bigint
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(InvoiceOpCodes.DEACTIVATE_INVOICE, 32)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  async sendPayInvoice(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(InvoiceOpCodes.PAY_INVOICE, 32)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  async getInvoiceStore(provider: ContractProvider) {
    const result = await provider.get("get_invoice_store", []);
    return result.stack.readAddress();
  }

  async getInvoiceMerchant(provider: ContractProvider) {
    const result = await provider.get("get_invoice_merchant", []);
    return result.stack.readAddress();
  }

  async getInvoiceBeneficiary(provider: ContractProvider) {
    const result = await provider.get("get_invoice_beneficiary", []);
    return result.stack.readAddress();
  }

  async getInvoiceCustomer(provider: ContractProvider) {
    const result = await provider.get("get_invoice_customer", []);
    return result.stack.readAddress();
  }

  async getInvoiceId(provider: ContractProvider) {
    const result = await provider.get("get_invoice_id", []);
    return result.stack.readString();
  }

  async getInvoiceAmount(provider: ContractProvider) {
    const result = await provider.get("get_invoice_amount", []);
    return result.stack.readNumber();
  }

  async getInvoicePaid(provider: ContractProvider) {
    const result = await provider.get("get_invoice_paid", []);
    return result.stack.readNumber() == -1;
  }

  async getInvoiceActive(provider: ContractProvider) {
    const result = await provider.get("get_invoice_active", []);
    return result.stack.readNumber() == -1;
  }

  async getInvoiceData(provider: ContractProvider): Promise<InvoiceData> {
    const result = await provider.get("get_invoice_data", []);
    return {
      store: result.stack.readAddress().toString(),
      merchant: result.stack.readAddress().toString(),
      beneficiary: result.stack.readAddress().toString(),
      customer: result.stack.readAddress().toString(),
      invoiceId: result.stack.readString().substring(4),
      amount: result.stack.readNumber(),
      paid: result.stack.readNumber() == -1,
      active: result.stack.readNumber() == -1,
    };
  }
}
