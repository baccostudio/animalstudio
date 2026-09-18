"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { cx } from "@/lib/cx";
import type { LeadCta } from "@/lib/leads/types";
import { LeadForm } from "./LeadForm";

type LeadModalContextValue = {
  open: (options?: { plan?: string; cta?: LeadCta }) => void;
  close: () => void;
};

const LeadModalContext = createContext<LeadModalContextValue | null>(null);

export function useLeadModal() {
  const ctx = useContext(LeadModalContext);
  if (!ctx) throw new Error("useLeadModal must be used inside <LeadModalProvider>");
  return ctx;
}

/** Lead-capture modal shared by every "Sumate / Empezá tu prueba" trigger on the page. */
export function LeadModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<string | undefined>();
  const [cta, setCta] = useState<LeadCta>("header");
  // Remounts <LeadForm> on every open so the previous submission state is cleared
  const [formKey, setFormKey] = useState(0);
  const lastFocused = useRef<HTMLElement | null>(null);

  const open = useCallback((options?: { plan?: string; cta?: LeadCta }) => {
    lastFocused.current = document.activeElement as HTMLElement | null;
    setPlan(options?.plan);
    setCta(options?.cta ?? "header");
    setFormKey((k) => k + 1);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => {
    setIsOpen(false);
    lastFocused.current?.focus();
  }, []);

  // Scroll lock and Escape key while open
  useEffect(() => {
    if (!isOpen) return;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen, close]);

  const value = useMemo(() => ({ open, close }), [open, close]);

  return (
    <LeadModalContext.Provider value={value}>
      {children}

      <div
        className={cx(
          "fixed inset-0 z-[1000] bg-[rgba(12,22,34,0.72)] flex items-center justify-center p-5 transition-opacity duration-300",
          isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none",
        )}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
        aria-hidden={!isOpen}
      >
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="leadModalTitle"
          className={cx(
            "bg-bone text-ink w-full max-w-[440px] px-8 pt-9 pb-8 relative transition-transform duration-300",
            isOpen ? "translate-y-0" : "translate-y-[14px]",
          )}
        >
          <button
            type="button"
            onClick={close}
            aria-label="Cerrar"
            className="absolute top-4 right-4 bg-transparent border-0 text-[20px] cursor-pointer text-charcoal leading-none p-1.5"
          >
            ✕
          </button>

          <Eyebrow className="text-navy-700">Animal Studio</Eyebrow>
          {/* Title, intro and form; replaced entirely by the success message once sent */}
          <LeadForm key={formKey} plan={plan} cta={cta} active={isOpen} />
        </div>
      </div>
    </LeadModalContext.Provider>
  );
}
