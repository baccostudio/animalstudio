import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

export function Eyebrow({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <p className={cx("font-display font-semibold uppercase tracking-[0.14em] text-[12.5px]", className)}>
      {children}
    </p>
  );
}
