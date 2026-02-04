"use client";

import Link from "next/link";
import css from "./Header.module.css";
import { usePathname } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  return (
    <header
      className={`${css.header} ${pathname === "/" ? css.homeHeader : ""}`}
    >
      <Link className={css.link} href="/" aria-label="Home">
        <svg className={css.logo}>
          <use href="../../img/sprite.svg#icon-logo"></use>
        </svg>
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li className={css.navigationItem}>
            <Link
              className={`${css.navigationLink} ${
                pathname === "/" ? css.active : ""
              }`}
              href="/"
            >
              Home
            </Link>
          </li>
          <li className={css.navigationItem}>
            <Link
              className={`${css.navigationLink} ${
                pathname === "/catalog" ? css.active : ""
              }`}
              href="/catalog"
            >
              Catalog
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
