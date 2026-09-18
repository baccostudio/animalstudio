"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import wordmark from "@/public/images/logo-wordmark-white.png";
import { NAV_LINKS } from "@/content/site";
import { LeadTrigger } from "@/components/lead/LeadTrigger";
import { cx } from "@/lib/cx";

const NAV_LINK =
  "text-[13px] font-semibold tracking-[0.05em] uppercase text-navy-200 no-underline transition-colors duration-200 hover:text-bone";

type Props = {
  /**
   * "landing": hidden until the intro splash is scrolled through, transparent gradient over the hero.
   * "page": always visible and solid (subpages without intro/hero, e.g. /privacidad).
   */
  variant?: "landing" | "page";
};

export function SiteHeader({ variant = "landing" }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const solid = variant === "page" || scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cx(
        "fixed top-0 inset-x-0 z-[100] flex items-center justify-between px-gutter",
        solid
          ? "py-3 bg-navy-900 shadow-[0_1px_0_rgba(255,255,255,0.06)]"
          : "py-[18px] bg-[linear-gradient(to_bottom,rgba(12,22,34,0.75),rgba(12,22,34,0))]",
        "[transition:background_.35s_ease,padding_.35s_ease,box-shadow_.35s_ease]",
        // Landing: hidden until the intro splash has been scrolled through (JS only)
        variant === "landing" &&
          "intro-pending:opacity-0 intro-pending:invisible intro-pending:pointer-events-none intro-pending:[transition:opacity_.6s_ease,visibility_0s_linear_.6s]",
        variant === "landing" &&
          "intro-done:opacity-100 intro-done:visible intro-done:[transition:opacity_.6s_ease,background_.35s_ease,padding_.35s_ease,box-shadow_.35s_ease]",
      )}
    >
      <Link href="/#top" aria-label="Animal Studio — inicio">
        <Image src={wordmark} alt="Animal Studio" className="h-[17px] w-auto" />
      </Link>

      <nav className="flex items-center gap-9">
        <div
          className={cx(
            "md:flex md:static md:flex-row md:gap-8 md:bg-transparent md:p-0",
            menuOpen ? "flex fixed top-16 inset-x-0 flex-col gap-0 bg-navy-900 px-6 pt-2 pb-5" : "hidden",
          )}
        >
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href} className={NAV_LINK} onClick={() => setMenuOpen(false)}>
              {link.label}
            </a>
          ))}
        </div>
        <div className="flex items-center gap-[22px]">
          <LeadTrigger cta="header" variant="outline">
            Sumate
          </LeadTrigger>
        </div>
      </nav>

      <button
        type="button"
        className="md:hidden bg-transparent border-0 p-2 cursor-pointer"
        aria-label={menuOpen ? "Cerrar menú" : "Abrir menú"}
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((v) => !v)}
      >
        <span className="block w-[22px] h-0.5 bg-bone my-[5px]" />
        <span className="block w-[22px] h-0.5 bg-bone my-[5px]" />
        <span className="block w-[22px] h-0.5 bg-bone my-[5px]" />
      </button>
    </header>
  );
}
