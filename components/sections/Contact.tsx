import { CONTACT_ROWS } from "@/content/contact";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { LeadTrigger } from "@/components/lead/LeadTrigger";
import { cx } from "@/lib/cx";

export function Contact() {
  return (
    <Section id="contacto" tone="navy">
      <Container className="grid lg:grid-cols-2 gap-[clamp(30px,6vw,80px)]">
        <div className="reveal">
          <Kicker number="06" />
          <h2 className="text-[clamp(28px,3.6vw,44px)] text-bone max-w-[12ch]">Vení a conocer Animal.</h2>
          <p className="text-navy-200 mt-4 max-w-[34ch]">
            Aunque tengas otro gym más cerca, valé la pena el viaje. Coordinamos tu primera visita y te mostramos el
            método por dentro.
          </p>
          <div className="mt-8 flex flex-col gap-[22px]">
            {CONTACT_ROWS.map((row) => (
              <div key={row.label} className="flex flex-col gap-1 border-t border-navy-700 pt-4">
                <span className="font-display text-[11px] tracking-[0.1em] uppercase text-navy-400">{row.label}</span>
                {row.href ? (
                  <a href={row.href} target="_blank" rel="noopener" className="text-[16px] text-bone underline">
                    {row.value}
                  </a>
                ) : (
                  <span className={cx("text-[16px]", row.pending ? "text-navy-400 italic" : "text-bone")}>
                    {row.value}
                  </span>
                )}
              </div>
            ))}
          </div>
          <LeadTrigger cta="contacto" variant="primary" className="mt-8">
            Coordinar una visita
          </LeadTrigger>
        </div>

        <div className="reveal map-grid bg-navy-800 border border-navy-700 min-h-[340px] flex items-center justify-center text-center p-10 relative overflow-hidden">
          <div className="relative z-[1]">
            <div className="w-3.5 h-3.5 rounded-full bg-navy-200 mx-auto mb-4 shadow-[0_0_0_8px_rgba(212,221,228,0.15)]" />
            <p className="text-navy-200 text-[13.5px] max-w-[30ch] mx-auto leading-[1.6]">
              Mapa e indicaciones — a completar con la ubicación definitiva de la sede.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
