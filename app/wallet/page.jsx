import { getSession } from "@auth0/nextjs-auth0";

export default async function Wallet() {
  const { user } = await getSession();
  return (
    <div>
      <p>Welcome to your wallet, {user.name}</p>
      <div>
        {/* TODO Link? */}
        <a href="/profile">Profile</a>
      </div>
      <div>
        <a href="/api/auth/logout">Log out</a>
      </div>
    </div>
  );
}
