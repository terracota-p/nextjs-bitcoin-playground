import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "../lib/auth";
import { getWalletByUser } from "../lib/user-wallets";
import { createUserBitcoinAddress } from "../lib/bitcoin-addresses";
import { saveUserData } from "../lib/repository/users-repository";

export default async function GenBitcoinAddress() {
  const { email } = await getAuthenticatedUser();

  const { bankAccount, bitcoinAddress } = await getWalletByUser(email);
  if (!bankAccount) {
    console.log(
      `No bank account linked for ${email}, redirect to link process`
    );
    redirect("/link-bank-account");
  }
  if (bitcoinAddress) {
    console.log(
      `User ${email} already linked bank account and has bitcoin address, redirect to wallet`
    );
    redirect("/wallet");
  }

  async function genBitcoinAddressAction(formData) {
    "use server";

    const name = formData.get("name");

    await saveUserData({ email, name });
    const address = await createUserBitcoinAddress(email);

    console.log(
      `Generated bitcoin address ${address} for ${email} and collected personal data, redirect to wallet`
    );
    redirect("/wallet");
  }

  return (
    <div>
      <p>
        As a last step, please provide your personal data and your bitcoin
        address will be generated:
      </p>
      <form action={genBitcoinAddressAction}>
        <div>
          <label htmlFor="name">Your name</label>
          <input type="text" id="name" name="name" required />
        </div>
        <div>
          <button type="submit">Generate bitcoin address</button>
        </div>
      </form>
    </div>
  );
}
