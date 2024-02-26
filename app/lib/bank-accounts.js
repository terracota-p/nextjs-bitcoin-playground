import {
  getBankAccountByUser,
  saveBankAccount,
} from "./repository/bank-accounts-repository";

/**
 *
 * @param {string} email
 * @returns {Promise<string | undefined>}
 */
export async function getLinkedBankAccount(email) {
  const linked = await getBankAccountByUser(email);
  return linked?.bank_account;
}

/**
 *
 * @param {string} email
 * @param {string} bankAccount
 */
export async function setLinkedBankAccount(email, bankAccount) {
  await saveBankAccount(email, bankAccount);
}
