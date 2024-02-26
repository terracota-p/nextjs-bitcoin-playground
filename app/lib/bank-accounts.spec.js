import { expect, it, vi } from "vitest";
import { getLinkedBankAccount, setLinkedBankAccount } from "./bank-accounts";
import * as repo from "./repository/bank-accounts-repository.js";

givenMockRepository();

it("should get linked bank account - not linked", async () => {
  expect(await getLinkedBankAccount("not@linked.com")).toBeUndefined();
});

it("should get linked bank account - linked", async () => {
  expect(await getLinkedBankAccount(userWithLinkedAccount)).toBe(
    linkedBankAccount
  );
});

it("should set linked bank account", async () => {
  await setLinkedBankAccount("foo@bar.com", "789");

  expect(repo.saveBankAccount).toHaveBeenCalled();
});

function givenMockRepository() {
  // `vi.mock` is hoisted, so it's run only once, at the top of the file - ref https://vitest.dev/guide/mocking.html
  vi.mock("./repository/bank-accounts-repository.js", async () => {
    return {
      getBankAccountByUser: (email) =>
        email === userWithLinkedAccount
          ? {
              user_email: userWithLinkedAccount,
              bank_account: linkedBankAccount,
            }
          : undefined,
      saveBankAccount: vi.fn(),
    };
  });
}

const userWithLinkedAccount = "linked@foo.com";
const linkedBankAccount = "123";
