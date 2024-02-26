"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { usePlaidLink } from "react-plaid-link";
import SideNav from "../ui/sidenav";

export default function PlaidLink() {
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const createLinkToken = async () => {
      const response = await fetch("/api/bank-accounts/create-link-token", {
        method: "POST",
      });
      const { link_token } = await response.json();
      setToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = async (public_token) => {
    await fetch("/api/bank-accounts/exchange-public-token", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ public_token }),
    });

    router.push("/gen-bitcoin-address");
  };

  const { open, ready } = usePlaidLink({
    token,
    onSuccess,
  });

  return (
    <button onClick={() => open()} disabled={!ready}>
      Link bank account
    </button>
  );
}
