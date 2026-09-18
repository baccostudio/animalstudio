import Image from "next/image";
import Link from "next/link";
import logoFull from "@/public/images/logo-full-white.png";
import { FOOTER_COLUMNS, FOOTER_LEGAL, FOOTER_TAGLINE } from "@/content/site";
import { Container } from "@/components/ui/Container";
import { LeadTrigger } from "@/components/lead/LeadTrigger";

const LINK = "block text-[14px] text-mist no-underline mb-2.5 transition-colors duration-200 hover:text-bone";

export function SiteFooter() {
  return (
    <footer className="bg-ink text-mist pt-16 pb-[34px]">
      <Container>
        <div className="flex justify-between items-start gap-10 flex-wrap pb-12 border-b border-[rgba(249,249,248,0.12)]">
          <Image src={logoFull} alt="Animal Studio" className="h-[22px] w-auto" />
          <div className="flex gap-9 md:gap-16 flex-wrap">
            {FOOTER_COLUMNS.map((col) => (
              <div key={col.title}>
                <h4 className="font-display text-[11px] tracking-[0.1em] uppercase text-stone mb-4 font-semibold">
                  {col.title}
                </h4>
                {col.links.map((link) =>
                  link.lead ? (
                    <LeadTrigger key={link.label} cta="footer" asLink className={LINK}>
                      {link.label}
                    </LeadTrigger>
                  ) : link.internal ? (
                    <Link key={link.label} href={link.href} className={LINK}>
                      {link.label}
                    </Link>
                  ) : (
                    <a
                      key={link.label}
                      href={link.href}
                      className={LINK}
                      {...(link.external ? { target: "_blank", rel: "noopener" } : {})}
                    >
                      {link.label}
                    </a>
                  ),
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="flex justify-between items-center gap-5 flex-wrap pt-[26px]">
          <span className="font-display text-[13px] tracking-[0.03em] text-stone">{FOOTER_TAGLINE}</span>
          <span className="text-[12px] text-stone">{FOOTER_LEGAL}</span>
        </div>
      </Container>
    </footer>
  );
}
