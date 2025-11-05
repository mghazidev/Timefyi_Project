import { useEffect, useRef } from "react";

/**
 * A React-safe wrapper for setInterval that automatically clears
 * on unmount and avoids stale closures.
 *
 * @param callback - function to run
 * @param delay - interval in ms (set null to disable)
 */
export function useInterval(callback: () => void, delay: number | null) {
  const savedCallback = useRef(callback);

  // Keep the latest callback
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval
  useEffect(() => {
    if (delay === null) return;

    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
