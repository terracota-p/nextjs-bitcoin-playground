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
        <Link href="/login">
          <span>Log in</span>
        </Link>
      </div>
    </main>
  );
}
