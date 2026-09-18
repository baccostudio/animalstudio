"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import logoIcon from "@/public/images/logo-icon-white.png";

const HALF = "absolute top-0 left-0 w-full h-full object-contain opacity-100 will-change-[transform,opacity]";

/**
 * Full-screen black splash shown before the hero. As the page scrolls, the two
 * halves of the icon spread apart and grow; past 62% the header is revealed
 * by toggling `intro-done` on <html>.
 */
export function IntroSplash() {
  const splash = useRef<HTMLElement>(null);
  const left = useRef<HTMLImageElement>(null);
  const right = useRef<HTMLImageElement>(null);
  const hint = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let ticking = false;

    const update = () => {
      ticking = false;
      const el = splash.current;
      if (!el) return;
      const height = el.offsetHeight || window.innerHeight;
      const progress = Math.min(Math.max(window.scrollY / height, 0), 1);

      if (!prefersReduced && left.current && right.current) {
        const spread = progress * Math.min(window.innerWidth * 0.6, 760);
        const scale = 1 + progress * 2.6;
        const fadeStart = 0.78;
        const opacity = progress <= fadeStart ? 1 : Math.max(0, 1 - (progress - fadeStart) / (1 - fadeStart));
        left.current.style.transform = `translateX(-${spread}px) scale(${scale})`;
        right.current.style.transform = `translateX(${spread}px) scale(${scale})`;
        left.current.style.opacity = String(opacity);
        right.current.style.opacity = String(opacity);
      }
      if (hint.current) {
        hint.current.style.opacity = String(Math.max(0, 1 - progress * 2.4));
      }
      document.documentElement.classList.toggle("intro-done", progress > 0.62);
    };

    const onScroll = () => {
      if (!ticking) {
        ticking = true;
        window.requestAnimationFrame(update);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <section
      ref={splash}
      aria-hidden="true"
      className="relative h-svh flex items-center justify-center bg-black overflow-hidden intro-done:pointer-events-none"
    >
      <div className="relative w-[clamp(56px,9vw,104px)] aspect-[309/196]">
        <Image ref={left} src={logoIcon} alt="" loading="eager" className={`${HALF} [clip-path:inset(0_50%_0_0)]`} />
        <Image ref={right} src={logoIcon} alt="" loading="eager" className={`${HALF} [clip-path:inset(0_0_0_50%)]`} />
      </div>
      <div
        ref={hint}
        className="absolute left-1/2 bottom-[34px] -translate-x-1/2 flex flex-col items-center gap-2.5 text-[rgba(249,249,248,0.55)] font-display text-[10.5px] tracking-[0.2em] uppercase transition-opacity duration-[400ms]"
      >
        <span>Scroll</span>
        <span className="intro-hint-line w-px h-[30px] bg-[rgba(249,249,248,0.35)] animate-intro-hint" />
      </div>
    </section>
  );
}
