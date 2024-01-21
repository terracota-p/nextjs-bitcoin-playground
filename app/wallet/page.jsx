export default function Wallet() {
  return (
    <div>
      <p>Welcome to your wallet</p>
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
