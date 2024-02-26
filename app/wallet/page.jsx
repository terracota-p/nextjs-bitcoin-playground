import Link from "next/link";
import { redirect } from "next/navigation";
import { getAuthenticatedUser } from "../lib/auth";
import { getWalletByUser } from "../lib/user-wallets";
import { getBitcoinBalance } from "../lib/repository/bitcoin-api-client";
import { getUserData } from "../lib/repository/users-repository";

export default async function Wallet() {
  const { email } = await getAuthenticatedUser();

  const { bankAccount, bitcoinAddress } = await getWalletByUser(email);
  if (!bankAccount) {
    console.log(
      `No bank account linked for ${email}, redirect to link process`
    );
    redirect("/link-bank-account");
  }
  if (!bitcoinAddress) {
    console.log(`No bitcoin address exists for ${email}, redirect to generate`);
    redirect("/gen-bitcoin-address");
  }
  console.log(
    `User ${email} already linked bank account and generated bitcoin address, accessing wallet`
  );

  const [bitcoinBalance, userData] = await Promise.all([
    getBitcoinBalance(email),
    getUserData(email),
  ]);

  return (
    <div>
      <div>
        Welcome to your wallet, {userData?.name} &lt;{email}&gt;
      </div>
      <div>Your bank account is {bankAccount}</div>
      <div>
        Your bitcoin address is {bitcoinAddress} with balance{" "}
        {bitcoinBalance ?? "not available at this time"}
      </div>
      <div>
        <Link href="/wallet/purchase">Purchase bitcoins</Link>
      </div>
      <div>
        <Link href="/profile">Profile</Link>
      </div>
    </div>
  );
}
