import { Configuration, PlaidApi, PlaidEnvironments } from "plaid";

export async function linkTokenCreate() {
  const tokenResponse = await plaidClient.linkTokenCreate({
    user: {
      // XXX should be user id - ref https://plaid.com/docs/quickstart/
      client_user_id: process.env.PLAID_CLIENT_ID,
    },
    client_name: "Bitcoin wallet",
    language: "en",
    products: ["auth"],
    country_codes: ["US"],
  });

  return tokenResponse.data;
}

export async function exchangePublicToken(public_token) {
  const exchangeResponse = await plaidClient.itemPublicTokenExchange({
    public_token,
  });

  return exchangeResponse.data.access_token;
}

const plaidClient = new PlaidApi(
  new Configuration({
    basePath: PlaidEnvironments[process.env.PLAID_ENV],
    baseOptions: {
      headers: {
        "PLAID-CLIENT-ID": process.env.PLAID_CLIENT_ID,
        "PLAID-SECRET": process.env.PLAID_SECRET,
        "Plaid-Version": "2020-09-14",
      },
    },
  })
);
