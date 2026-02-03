import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <h1>Find your perfect rental car</h1>
      <p>Reliable and budget-friendly rentals for any journey</p>
      <Link href="/catalog">View Catalog</Link>
    </div>
  );
}
