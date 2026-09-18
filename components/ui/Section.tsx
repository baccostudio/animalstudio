import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Tone = "bone" | "navy" | "ink";

const TONES: Record<Tone, string> = {
  bone: "bg-bone text-ink",
  navy: "bg-navy-900 text-bone",
  ink: "bg-ink text-bone",
};

type Props = {
  id?: string;
  tone: Tone;
  /** Default vertical padding; disable to set custom padding via className. */
  padded?: boolean;
  className?: string;
  children: ReactNode;
};

export function Section({ id, tone, padded = true, className, children }: Props) {
  return (
    <section id={id} className={cx(padded && "py-[clamp(72px,10vw,140px)]", TONES[tone], className)}>
      {children}
    </section>
  );
}
