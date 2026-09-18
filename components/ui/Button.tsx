import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cx } from "@/lib/cx";

export type ButtonVariant = "primary" | "outline" | "dark" | "ink";

const BASE =
  "inline-flex items-center gap-2.5 font-body font-bold text-[14px] tracking-[0.02em] uppercase px-[26px] py-[15px] rounded-[2px] border cursor-pointer no-underline whitespace-nowrap [transition:background_.25s_ease,color_.25s_ease,border-color_.25s_ease,transform_.2s_ease] active:translate-y-px";

const VARIANTS: Record<ButtonVariant, string> = {
  primary: "bg-bone text-navy-900 border-transparent hover:bg-navy-200",
  outline: "bg-transparent text-bone border-[rgba(249,249,248,0.4)] hover:border-bone",
  dark: "bg-navy-900 text-bone border-transparent hover:bg-navy-700",
  ink: "bg-ink text-bone border-transparent hover:bg-charcoal",
};

export function buttonClasses(variant: ButtonVariant = "primary", className?: string) {
  return cx(BASE, VARIANTS[variant], className);
}

type Common = { variant?: ButtonVariant; className?: string; children: ReactNode };
type AsLink = Common & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };
type AsButton = Common & ButtonHTMLAttributes<HTMLButtonElement> & { href?: undefined };
export type ButtonProps = AsLink | AsButton;

/**
 * Renders an <a> when `href` is given, otherwise a <button>.
 * Line-height mirrors the original markup: buttons use the UA `normal`, links inherit 1.5.
 */
export function Button(props: ButtonProps) {
  if (props.href !== undefined) {
    const { variant, className, children, ...rest } = props;
    return (
      <a className={buttonClasses(variant, cx("leading-[1.5]", className))} {...rest}>
        {children}
      </a>
    );
  }
  const { variant, className, children, type = "button", ...rest } = props;
  return (
    <button type={type} className={buttonClasses(variant, cx("leading-[normal]", className))} {...rest}>
      {children}
    </button>
  );
}
