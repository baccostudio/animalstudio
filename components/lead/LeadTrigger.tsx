"use client";

import type { ReactNode } from "react";
import { Button, type ButtonVariant } from "@/components/ui/Button";
import type { LeadCta } from "@/lib/leads/types";
import { useLeadModal } from "./LeadModalProvider";

type Props = {
  /** Where this trigger lives; stored with the lead as its origin. */
  cta: LeadCta;
  /** Plan name shown in the modal title ("Plan …") and sent with the lead. */
  plan?: string;
  variant?: ButtonVariant;
  className?: string;
  /** Render as a plain link instead of a styled button (footer). */
  asLink?: boolean;
  children: ReactNode;
};

/** Any control that opens the lead-capture modal. */
export function LeadTrigger({ cta, plan, variant = "primary", className, asLink, children }: Props) {
  const { open } = useLeadModal();

  if (asLink) {
    return (
      <a
        href="#"
        className={className}
        onClick={(e) => {
          e.preventDefault();
          open({ plan, cta });
        }}
      >
        {children}
      </a>
    );
  }

  return (
    <Button variant={variant} className={className} onClick={() => open({ plan, cta })}>
      {children}
    </Button>
  );
}
