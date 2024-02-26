import { getLinkedBankAccount } from "./bank-accounts";
import { getBitcoinAddress } from "./bitcoin-addresses";

/**
 *
 * @param {string} email
 * @returns
 */
export async function getWalletByUser(email) {
  const [bankAccount, bitcoinAddress] = await Promise.all([
    getLinkedBankAccount(email),
    getBitcoinAddress(email),
  ]);
  return { bankAccount, bitcoinAddress };
}
