import Image from "next/image";
import styles from "./page.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.description}>
        <p>Bitcoin wallet</p>
      </div>

      <div className={styles.center}>
        <div>
          <a href="/api/auth/login">Log in / Sign up</a>
        </div>
        <div>
          {/* TODO redirect on login instead of link */}
          <a href="/wallet">Wallet</a>
        </div>
      </div>
    </main>
  );
}
