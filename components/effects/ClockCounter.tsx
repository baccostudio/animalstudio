"use client";

import { useEffect, useRef, useState } from "react";

const DURATION = 1200;

function parse(target: string) {
  const [m, s] = target.split(":");
  return (parseInt(m, 10) || 0) * 60 + (parseInt(s, 10) || 0);
}

function format(total: number) {
  const m = Math.floor(total / 60);
  const s = total % 60;
  return `${m < 10 ? "0" + m : m}:${s < 10 ? "0" + s : s}`;
}

/** Digital clock that counts up from 00:00 to `target` (mm:ss) when it enters the viewport. */
export function ClockCounter({ target, className }: { target: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState("00:00");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const targetSeconds = parse(target);
    let frame = 0;

    const run = () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
        setValue(format(targetSeconds));
        return;
      }
      let start: number | null = null;
      const step = (ts: number) => {
        if (start === null) start = ts;
        const t = Math.min((ts - start) / DURATION, 1);
        const eased = 1 - Math.pow(1 - t, 3);
        setValue(format(Math.round(eased * targetSeconds)));
        if (t < 1) frame = requestAnimationFrame(step);
        else setValue(format(targetSeconds));
      };
      frame = requestAnimationFrame(step);
    };

    if (!("IntersectionObserver" in window)) {
      run();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          run();
          io.disconnect();
        }
      },
      { threshold: 0.5 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(frame);
    };
  }, [target]);

  return (
    <p ref={ref} className={className}>
      {value}
    </p>
  );
}
