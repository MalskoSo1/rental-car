import Link from "next/link";
import css from "./page.module.css";

export default function Home() {
  return (
    <main className={css.page}>
      <h1 className={css.title}>Find your perfect rental car</h1>
      <p className={css.text}>
        Reliable and budget-friendly rentals for any journey
      </p>
      <Link className={css.link} href="/catalog">
        View Catalog
      </Link>
    </main>
  );
}
