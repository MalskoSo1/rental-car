"use client";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  return (
    <div className="notFound">
      <div className="notFoundBox">
        <h2 className="notFoundHeading">Something went wrong</h2>
        <button onClick={() => reset()} className="errorButton">
          Try again
        </button>
      </div>
    </div>
  );
}
