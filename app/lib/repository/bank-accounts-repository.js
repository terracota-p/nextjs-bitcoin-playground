import { sql } from "@vercel/postgres";
import { handleDbErr } from "./handle-db-err";

/**
 *
 * @param {string} userEmail
 * @returns {Promise<{user_email: string, bank_account: string} | undefined>}
 */
export async function getBankAccountByUser(userEmail) {
  try {
    const data = await sql`
        SELECT *
        FROM wallet_bank_accounts
        WHERE user_email = ${userEmail}`;

    return data.rows[0];
  } catch (error) {
    handleDbErr(error);
  }
}

/**
 *
 * @param {string} userEmail
 * @param {string} bankAccount
 * @returns
 */
export async function saveBankAccount(userEmail, bankAccount) {
  try {
    await sql`
        INSERT INTO wallet_bank_accounts (user_email, bank_account)
        VALUES (${userEmail}, ${bankAccount})`;
  } catch (error) {
    handleDbErr(error);
  }
}
