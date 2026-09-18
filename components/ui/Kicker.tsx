import { cx } from "@/lib/cx";

/** Section number with a short rule, e.g. "01 ———". Inherits text color. */
export function Kicker({ number, className }: { number: string; className?: string }) {
  return (
    <div className={cx("flex items-center gap-3.5 mb-[22px]", className)}>
      <span className="font-display font-semibold text-[13px] tracking-[0.1em]">{number}</span>
      <span className="h-px w-11 bg-current opacity-35" />
    </div>
  );
}
