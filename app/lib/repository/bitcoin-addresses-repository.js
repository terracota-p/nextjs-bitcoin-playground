import { sql } from "@vercel/postgres";
import { handleDbErr } from "./handle-db-err";

/**
 *
 * @param {string} userEmail
 * @returns {Promise<string | undefined>}
 */
export async function getBitcoinAddress(userEmail) {
  try {
    const data = await sql`
        SELECT *
        FROM wallet_addresses
        WHERE user_email = ${userEmail}`;

    return data.rows[0]?.bitcoin_address;
  } catch (error) {
    handleDbErr(error);
  }
}

/**
 *
 * @param {string} userEmail
 * @param {string} btcAddress
 * @returns
 */
export async function saveBitcoinAddress(userEmail, btcAddress) {
  try {
    await sql`
        INSERT INTO wallet_addresses (user_email, bitcoin_address)
        VALUES (${userEmail}, ${btcAddress})`;
  } catch (error) {
    handleDbErr(error);
  }
}
