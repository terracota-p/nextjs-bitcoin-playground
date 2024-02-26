import { sql } from "@vercel/postgres";
import { handleDbErr } from "./handle-db-err";

/**
 *
 * @param {string} email
 * @returns {Promise<UserData | undefined>}
 */
export async function getUserData(email) {
  try {
    const data = await sql`
        SELECT *
        FROM wallet_users
        WHERE email = ${email}`;

    return data.rows[0];
  } catch (error) {
    handleDbErr(error);
  }
}

/**
 * @typedef {{email: string;name: string;}} UserData
 */

/**
 *
 * @param {UserData} data
 */
export async function saveUserData({ email, name }) {
  try {
    await sql`
        INSERT INTO wallet_users (email, name)
        VALUES (${email}, ${name})`;
  } catch (error) {
    handleDbErr(error);
  }
}
