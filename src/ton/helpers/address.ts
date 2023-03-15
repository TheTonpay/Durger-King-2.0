import { Address } from "ton-core";

export function isAddress(src: string) {
  try {
    Address.parse(src);
    return true;
  } catch (e) {
    return false;
  }
}
