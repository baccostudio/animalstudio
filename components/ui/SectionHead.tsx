import type { ReactNode } from "react";
import { cx } from "@/lib/cx";

type Props = {
  title: ReactNode;
  description: ReactNode;
  className?: string;
  titleClassName?: string;
  descriptionClassName?: string;
};

/** Title + short paragraph laid out side by side (stacks when narrow). */
export function SectionHead({ title, description, className, titleClassName, descriptionClassName }: Props) {
  return (
    <div className={cx("flex justify-between items-end gap-6 mb-14 flex-wrap", className)}>
      <h2 className={cx("text-[clamp(30px,4vw,52px)] max-w-[14ch]", titleClassName)}>{title}</h2>
      <p className={cx("max-w-[38ch] text-charcoal text-[15px] leading-[1.6]", descriptionClassName)}>{description}</p>
    </div>
  );
}
