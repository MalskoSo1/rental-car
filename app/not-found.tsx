"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => router.push("/"), 5000);
    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="notFound">
      <div className="notFoundBox">
        <h1 className="notFoundHeading">404 - Page not found</h1>

        <p className="notFoundDescription">
          Sorry, the page you are looking for does not exist.
          <br />
          You will be redirected to the main page in a few seconds…
        </p>
      </div>
    </div>
  );
}
