import { getAuthenticatedUser } from "@/app/lib/auth";
import { setLinkedBankAccount } from "@/app/lib/bank-accounts";
import { exchangePublicToken } from "@/app/lib/repository/bank-api-client";

/**
 *
 * @param {Request} req
 * @returns
 */
export async function POST(req) {
  const accessToken = await exchangePublicToken(
    (
      await req.json()
    ).public_token
  );

  await saveBankAccountAccessToken(accessToken);

  const { email } = await getAuthenticatedUser();
  // XXX store the bank account (get it from plaid) for later use
  await setLinkedBankAccount(email, "1234");
  console.log(`Bank account linked for ${email}`);

  return Response.json({ ok: true });
}

async function saveBankAccountAccessToken(accessToken) {
  // XXX store the access token obtained from plaid to call its API later on
  // - ref "These values should be saved to a persistent database" in https://plaid.com/docs/quickstart/ :
}
