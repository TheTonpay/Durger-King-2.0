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
import {} from "ton";

export const StoreOpCodes = {
  ISSUE_INVOICE: 0x4b4e70b0,
  REQUEST_PURCHASE: 0x36b795b5,
  EDIT_STORE: 0xa0b2b61d,
  DELETE_STORE: 0xfb4aca1a,
  DEACTIVATE_STORE: 0xf9bf9637,
  ACTIVATE_STORE: 0x97500daf,
};

export type StoreConfig = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mcc_code: number;
  active: boolean;
  invoice_code: Cell;
};

export type StoreData = {
  owner: string;
  name: string;
  description: string;
  image: string;
  mcc_code: number;
  active: boolean;
};

export function storeConfigToCell(config: StoreConfig): Cell {
  return beginCell()
    .storeAddress(Address.parse(config.owner))
    .storeRef(comment(config.name))
    .storeRef(comment(config.description))
    .storeRef(comment(config.image))
    .storeUint(config.mcc_code, 16)
    .storeInt(config.active ? -1 : 0, 2)
    .storeRef(config.invoice_code)
    .endCell();
}

export class Store implements Contract {
  constructor(
    readonly address: Address,
    readonly init?: { code: Cell; data: Cell }
  ) {}

  static createFromAddress(address: Address) {
    return new Store(address);
  }

  static createFromConfig(config: StoreConfig, code: Cell, workchain = 0) {
    const data = storeConfigToCell(config);
    const init = { code, data };
    return new Store(contractAddress(workchain, init), init);
  }

  async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell().endCell(),
    });
  }

  async sendEditStore(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      name: string;
      description: string;
      image: string;
      mcc_code: number;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(StoreOpCodes.EDIT_STORE, 32)
        .storeUint(0, 64)
        .storeRef(comment(opts.name))
        .storeRef(comment(opts.description))
        .storeRef(comment(opts.image))
        .storeUint(opts.mcc_code, 16)
        .endCell(),
    });
  }

  async sendDeactivateStore(
    provider: ContractProvider,
    via: Sender,
    value: bigint
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(StoreOpCodes.DEACTIVATE_STORE, 32)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  async sendActivateStore(
    provider: ContractProvider,
    via: Sender,
    value: bigint
  ) {
    await provider.internal(via, {
      value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(StoreOpCodes.ACTIVATE_STORE, 32)
        .storeUint(0, 64)
        .endCell(),
    });
  }

  async sendIssueInvoice(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      customer: string;
      invoice_id: string;
      amount: bigint;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(StoreOpCodes.ISSUE_INVOICE, 32)
        .storeUint(0, 64)
        .storeRef(
          beginCell().storeAddress(Address.parse(opts.customer)).endCell()
        )
        .storeRef(comment(opts.invoice_id))
        .storeUint(opts.amount, 64)
        .endCell(),
    });
  }

  async sendRequestPurchase(
    provider: ContractProvider,
    via: Sender,
    opts: {
      value: bigint;
      invoice_id: string;
      amount: bigint;
    }
  ) {
    await provider.internal(via, {
      value: opts.value,
      sendMode: SendMode.PAY_GAS_SEPARATELY,
      body: beginCell()
        .storeUint(StoreOpCodes.REQUEST_PURCHASE, 32)
        .storeUint(0, 64)
        .storeRef(comment(opts.invoice_id))
        .storeUint(opts.amount, 64)
        .endCell(),
    });
  }

  async getStoreName(provider: ContractProvider) {
    const result = await provider.get("get_store_name", []);
    return result.stack.readString();
  }

  async getStoreDescription(provider: ContractProvider) {
    const result = await provider.get("get_store_description", []);
    return result.stack.readString();
  }

  async getStoreImage(provider: ContractProvider) {
    const result = await provider.get("get_store_image", []);
    return result.stack.readString();
  }

  async getStoreMccCode(provider: ContractProvider) {
    const result = await provider.get("get_store_mcc_code", []);
    return result.stack.readNumber();
  }

  async getStoreOwner(provider: ContractProvider) {
    const result = await provider.get("get_store_owner", []);
    return result.stack.readAddress();
  }

  async getStoreActive(provider: ContractProvider) {
    const result = await provider.get("get_store_active", []);
    return result.stack.readNumber() === -1;
  }

  async getStoreData(provider: ContractProvider): Promise<StoreData> {
    const result = await provider.get("get_store_data", []);
    return {
      owner: result.stack.readAddress().toString(),
      name: result.stack.readString().substring(4),
      description: result.stack.readString().substring(4),
      image: result.stack.readString().substring(4),
      mcc_code: result.stack.readNumber(),
      active: result.stack.readNumber() === -1,
    };
  }
}
