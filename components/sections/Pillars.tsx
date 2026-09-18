import { PILLARS } from "@/content/pillars";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";

const CELL =
  "border-r border-b border-mist px-[26px] pt-[30px] pb-[34px] flex flex-col gap-11 min-h-[216px] transition-colors duration-300 hover:bg-bone";

export function Pillars() {
  return (
    <Section id="metodo" tone="bone">
      <Container>
        <Kicker number="02" className="reveal" />
        <SectionHead
          className="reveal"
          title={
            <>
              Siete pilares,
              <br />
              un solo sistema.
            </>
          }
          titleClassName="font-display font-extrabold uppercase tracking-[0.02em] text-navy-600"
          description="No es una rutina ni una clase suelta: es el sistema que integra todo lo necesario para construir un cuerpo capaz de rendir durante toda la vida."
        />
        <div className="reveal grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-l border-mist">
          {PILLARS.map((pillar) => (
            <div key={pillar.number} className={CELL}>
              <span className="font-display font-semibold text-[13px] text-stone tracking-[0.08em]">{pillar.number}</span>
              <h3 className="font-display font-semibold text-[19px] uppercase tracking-[0.02em] text-navy-600">
                {pillar.title}
              </h3>
              <p className="text-[13.5px] text-charcoal leading-[1.55]">{pillar.description}</p>
            </div>
          ))}
          <div className={`${CELL} justify-center items-start`}>
            <p className="font-display font-bold uppercase tracking-[0.01em] text-[clamp(21px,2.1vw,27px)] leading-[1.18] text-navy-900">
              Exclusivo en calidad.
              <br />
              Inclusivo en personas.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}
