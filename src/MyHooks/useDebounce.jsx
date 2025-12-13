// src/MyHooks/useDebounce.js (আপডেটেড ভার্সন)

import { useState, useEffect, useRef } from "react";

function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  const firstRender = useRef(true);

  useEffect(() => {
    // প্রথম রেন্ডারে (initial value) তৎক্ষণাৎ সেট করো, debounce ছাড়া
    if (firstRender.current) {
      firstRender.current = false;
      setDebouncedValue(value);
      return;
    }

    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]); // এটা রাখতেই হবে, কিন্তু নিচের অপটিমাইজেশন দিয়ে re-render কমবে

  return debouncedValue;
}

export default useDebounce;
