import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";

const STRONG = "text-navy-700 font-extrabold";

export function Manifesto() {
  return (
    <Section id="manifiesto" tone="bone">
      <Container className="grid lg:grid-cols-[0.9fr_1.6fr] gap-[clamp(30px,6vw,90px)] items-start">
        <div className="reveal lg:sticky lg:top-[120px]">
          <Kicker number="01" />
        </div>
        <div>
          <blockquote className="reveal m-0 font-body font-bold text-[clamp(24px,3.4vw,40px)] leading-[1.22] tracking-[-0.01em] text-ink">
            No estamos acá para ocupar una hora de tu día. Estamos acá para mejorar{" "}
            <strong className={STRONG}>las otras veintitrés</strong>. No entrenamos para una foto, ni para una
            temporada, ni solo para vernos mejor. Entrenamos para sentirnos más vivos, para cargar a nuestros hijos,
            para viajar sin límites, para seguir practicando los deportes que amamos, para envejecer con
            independencia.
            <br />
            <br />
            Creemos que <strong className={STRONG}>la fuerza es libertad</strong>, que el movimiento es vida y que{" "}
            <strong className={STRONG}>la salud es el mayor lujo</strong>. El futuro no es algo que sucede: se
            construye. Cada entrenamiento, cada decisión, cada día.
          </blockquote>
          <div className="reveal mt-[34px] flex items-center gap-4 font-display text-[12.5px] tracking-[0.1em] uppercase text-stone">
            <span className="h-px w-[30px] bg-stone" />
            <span>Manifiesto Animal Studio</span>
          </div>
        </div>
      </Container>
    </Section>
  );
}
