import { getAuthenticatedUser } from "@/app/lib/auth";
import { purchaseBitcoin } from "@/app/lib/repository/bitcoin-api-client";
import { getWalletByUser } from "@/app/lib/user-wallets";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function Purchase({ searchParams }) {
  async function purchaseAction(formData) {
    "use server";

    const amountStr = formData.get("amount");
    const amount = Number(amountStr);

    const { email } = await getAuthenticatedUser();

    const { bankAccount, bitcoinAddress } = await getWalletByUser(email);
    if (!bankAccount || !bitcoinAddress) {
      throw new Error(
        `Wallet not properly set up, cannot purchase: ${{
          bankAccount,
          bitcoinAddress,
        }}`
      );
    }

    // XXX check exchange rate, do balance check on the origin bank account, subtract fiat from it

    await purchaseBitcoin(bitcoinAddress, amount);
    console.log("Purchased bitcoin", { bitcoinAddress, amount });

    redirect(`/wallet/purchase?purchasedAmount=${amount}`);
  }

  const { purchasedAmount } = searchParams;
  return (
    <div>
      {!purchasedAmount ? (
        <form action={purchaseAction}>
          <label htmlFor="amount">Amount (BTC)</label>
          <input
            type="number"
            id="amount"
            name="amount"
            step="0.00000001"
            required
          />
          <button type="submit" id="purchase" name="purchase">
            Purchase
          </button>
        </form>
      ) : (
        <p>You purchased {purchasedAmount} BTC</p>
      )}

      <div>
        <Link href="/wallet">Back to wallet</Link>
      </div>
    </div>
  );
}
