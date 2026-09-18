import { PLANS } from "@/content/plans";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { LeadTrigger } from "@/components/lead/LeadTrigger";
import { cx } from "@/lib/cx";

export function Plans() {
  return (
    <Section
      id="planes"
      tone="navy"
      padded={false}
      className="pt-[clamp(72px,10vw,120px)] pb-[clamp(72px,10vw,140px)]"
    >
      <Container>
        <Kicker number="04" className="reveal" />
        <div className="reveal max-w-[640px] mb-14">
          <h2 className="text-[clamp(30px,4vw,50px)] text-bone">Planes Animal</h2>
          <p className="mt-[18px] text-navy-200 text-[16px] leading-[1.6]">
            Sin ofertas de último momento ni descuentos que devalúan lo que construimos. Elegí cómo te comprometés
            — nosotros nos ocupamos del resto.
          </p>
        </div>

        <div className="reveal grid lg:grid-cols-3 gap-px bg-navy-700">
          {PLANS.map((plan) => (
            <div
              key={plan.name}
              className={cx(
                "px-[30px] pt-[38px] pb-[34px] flex flex-col gap-[26px]",
                plan.highlight ? "bg-navy-800" : "bg-navy-900",
              )}
            >
              <div className="flex justify-between items-start">
                <h3 className="text-bone text-[22px]">{plan.name}</h3>
                {plan.badge && (
                  <span className="font-display text-[10.5px] tracking-[0.1em] uppercase text-navy-950 bg-navy-200 px-2.5 py-[5px] rounded-[2px]">
                    {plan.badge}
                  </span>
                )}
              </div>
              <p className="text-navy-200 text-[14px] leading-[1.6]">{plan.description}</p>
              <ul className="list-none m-0 p-0 flex flex-col gap-[11px]">
                {plan.features.map((feature) => (
                  <li
                    key={feature}
                    className="text-mist text-[13.5px] flex gap-2.5 items-start leading-[1.45] before:content-['—'] before:text-navy-400 before:flex-none"
                  >
                    {feature}
                  </li>
                ))}
              </ul>
              <LeadTrigger
                cta="plan"
                plan={plan.leadLabel}
                variant={plan.highlight ? "primary" : "outline"}
                className="mt-auto w-full justify-center"
              >
                Quiero que me contacten
              </LeadTrigger>
            </div>
          ))}
        </div>

        <p className="reveal mt-7 text-navy-400 text-[12.5px] tracking-[0.02em]">
          Dejanos tus datos de contacto y un asesor de Animal te va a escribir con toda la información del plan —
          valores, formas de pago y disponibilidad.
        </p>
      </Container>
    </Section>
  );
}
