// @ts-check

import { createWallet } from "./repository/bitcoin-api-client";
import * as repository from "./repository/bitcoin-addresses-repository";

/**
 * @param {string} email
 */
export async function createUserBitcoinAddress(email) {
  const address = await createWallet(email);
  await repository.saveBitcoinAddress(email, address);
  console.log(`Bitcoin address saved: ${address}`);

  return address;
}

export const getBitcoinAddress = repository.getBitcoinAddress;
