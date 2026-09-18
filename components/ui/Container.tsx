import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

/** Centered content wrapper (max 1320px, fluid gutter). */
export function Container({ className, children }: { className?: string; children: ReactNode }) {
  return <div className={cx("max-w-site mx-auto px-gutter", className)}>{children}</div>;
}
