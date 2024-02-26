import { db } from "@vercel/postgres";
import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

async function createUsers(client) {
  await client.sql`
      CREATE TABLE IF NOT EXISTS wallet_users (
        email TEXT NOT NULL PRIMARY KEY,
        name VARCHAR(255) NOT NULL
      );
    `;

  console.log(`Created "wallet_users" table`);
}

async function createBankAccounts(client) {
  await client.sql`
      CREATE TABLE IF NOT EXISTS wallet_bank_accounts (
        user_email TEXT NOT NULL,
        bank_account VARCHAR(255) NOT NULL,
        PRIMARY KEY(user_email, bank_account)
      );
    `;

  console.log(`Created "wallet_bank_accounts" table`);
}

async function createBitcoinAddresses(client) {
  await client.sql`
      CREATE TABLE IF NOT EXISTS wallet_addresses (
        user_email TEXT NOT NULL,
        bitcoin_address VARCHAR(255) NOT NULL,
        PRIMARY KEY(user_email, bitcoin_address)
      );
    `;

  console.log(`Created "wallet_addresses" table`);
}

async function main() {
  const client = await db.connect();

  await createUsers(client);
  await createBankAccounts(client);
  await createBitcoinAddresses(client);

  await client.end();
}

main().catch((err) => {
  console.error("Error creating DB tables", err);
});
