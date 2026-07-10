"use client";

import { animate, useInView } from "framer-motion";
import { useEffect, useRef } from "react";

export default function Counter({
  value,
  suffix = "",
  decimals,
  className = "",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const places = decimals ?? (Number.isInteger(value) ? 0 : 1);

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration: 2,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (latest) => {
        node.textContent = latest.toLocaleString("en-US", {
          minimumFractionDigits: places,
          maximumFractionDigits: places,
        });
      },
    });
    return () => controls.stop();
  }, [inView, value, places]);

  return (
    <span className={className}>
      <span ref={ref}>0</span>
      {suffix}
    </span>
  );
}
