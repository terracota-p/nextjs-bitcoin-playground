// @ts-check

/**
 *
 * @param {string} walletName (ie: email)
 * @returns {Promise<string>}
 */
export async function createWallet(walletName) {
  await apiCall(null, "createwallet", "createwallet", [walletName]);

  const res = await apiCall(walletName, "getnewaddress", "getnewaddress", []);

  // XXX Only returning address as it's the only part used in current functionality.
  // In a real app, the wallet could be exported (to enable the user to own it and their key pair).
  return (await res.json())?.result;
}

/**
 *
 * @param {string} destBitcoinAddress
 * @param {number} amount
 */
export async function purchaseBitcoin(destBitcoinAddress, amount) {
  if (!destBitcoinAddress || !amount || amount <= 0) {
    // XXX throw bad request
    throw new Error(
      `Invalid params: ${JSON.stringify({ destBitcoinAddress, amount })}`
    );
  }

  await apiCall(origWalletName, "purchase", "sendtoaddress", [
    destBitcoinAddress,
    amount,
  ]);
}

const origWalletName = "app-central-wallet";

/**
 *
 * @param {string} walletName (ie: email)
 * @returns {Promise<string | null>}
 */
export async function getBitcoinBalance(walletName) {
  try {
    const res = await apiCall(walletName, "getbalance", "getbalances", []);
    const resBody = await res.json();
    // untrusted_pending to not need further blockchain confirmations (that won't take place in regtest)
    return resBody?.result?.mine?.untrusted_pending;
  } catch (error) {
    console.warn("Error getting bitcoin balance, continuing", error);
    return null;
  }
}

/**
 *
 * @param {string} walletName
 * @param {string} id call identifier (can be anything)
 * @param {string} operation
 * @param {any[]} params
 */
async function apiCall(walletName, id, operation, params) {
  const body = {
    body: JSON.stringify({
      jsonrpc: "1.0",
      id,
      method: operation,
      params,
    }),
    headers: {
      ...authHeader,
      "Content-Type": "text/plain;",
    },
    method: "POST",
  };
  const res = await fetch(
    url + (walletName ? `/wallet/${walletName}` : ""),
    body
  );
  if (!res.ok) {
    throw new Error(
      `Error ${res.status} in bitcoin ${operation}: ${JSON.stringify({
        body,
        resBody: await res.text(),
      })}`
    );
  }
  return res;
}

const url = "http://127.0.0.1:18443";
const authHeader = {
  // XXX local regtest node user:password - extract env var
  Authorization:
    "Basic Y2FybG9zOjg5NTViOTk5NGQ3YTUxYzAwOWU2Njg2NjE0MjYyYzM4YjU2MTlhMGQxNDc3NjNmZWM2YzUwYTgyZDc3MTFlNmU=",
};
