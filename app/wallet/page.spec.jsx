import * as nav from "next/navigation";
import { afterEach, describe, expect, it, vi } from "vitest";
import Wallet from "./page";

givenMockAuth();
givenMockBankAccounts();
givenMockBitcoinAddresses();
givenMockBitcoinApiClient();
givenMockUsers();
givenMockRedirect();

describe("wallet page", () => {
  afterEach(() => vi.clearAllMocks());

  it("should redirect to link bank account when not linked", async () => {
    givenLoggedInAs("not@linked.com");

    // XXX async Server Components cannot be tested as `render(<Wallet />)`, so not checking what is rendered here
    // ref - https://nextjs.org/docs/app/building-your-application/testing#async-server-components
    await Wallet();

    expect(nav.redirect).toHaveBeenCalledWith("/link-bank-account");
  });

  it("should show wallet when account linked and bitcoin address exists", async () => {
    givenLoggedInAs(userWithLinkedAccount);

    await Wallet();

    expect(nav.redirect).not.toHaveBeenCalled();
  });
});

function givenMockAuth() {
  // `vi.mock` is hoisted, so it's run only once, at the top of the file - ref https://vitest.dev/guide/mocking.html
  vi.mock("../lib/auth.js", async () => {
    return {
      getAuthenticatedUser: () => ({ email: loggedInAs, name: "John Doe" }),
    };
  });
}

function givenMockBankAccounts() {
  vi.mock("../lib/bank-accounts.js", async () => {
    return {
      getLinkedBankAccount: (email) =>
        email === userWithLinkedAccount ? linkedBankAccount : undefined,
    };
  });
}

const userWithLinkedAccount = "linked@foo.com";
const linkedBankAccount = "123";

function givenMockBitcoinAddresses() {
  vi.mock("../lib/bitcoin-addresses.js", async () => {
    return {
      createUserBitcoinAddress: () => bitcoinAddress,
      getBitcoinAddress: () => bitcoinAddress,
    };
  });
}

const bitcoinAddress = "foobarbaz";

function givenMockBitcoinApiClient() {
  vi.mock("../lib/repository/bitcoin-api-client.js", async () => {
    return {
      getBitcoinBalance: () => 42,
    };
  });
}

function givenMockUsers() {
  vi.mock("../lib/repository/users-repository.js", async () => {
    return {
      getUserData: () => ({ email: userWithLinkedAccount, name: "Foo Bar" }),
    };
  });
}

function givenMockRedirect() {
  vi.mock("next/navigation", async () => ({
    redirect: vi.fn(),
  }));
}

let loggedInAs = null;
function givenLoggedInAs(email) {
  loggedInAs = email;
}
