import { Container } from "@/components/ui/Container";
import { ClockCounter } from "@/components/effects/ClockCounter";

export function Breaker() {
  return (
    <section className="breaker-bg text-bone text-center py-[clamp(80px,12vw,160px)]">
      <Container className="reveal">
        {/* Same type as .eyebrow but sized like the breaker paragraph, as in the original cascade */}
        <p className="font-display font-semibold uppercase tracking-[0.14em] text-[clamp(15px,1.8vw,19px)] leading-[1.6] text-navy-200 max-w-[52ch] mx-auto mb-[18px]">
          El código de nuestra filosofía
        </p>
        <ClockCounter
          target="01:23"
          className="font-display font-bold text-[clamp(90px,18vw,220px)] leading-[0.9] tracking-[0.01em] mb-5"
        />
        <p className="max-w-[52ch] mx-auto text-navy-200 text-[clamp(15px,1.8vw,19px)] leading-[1.6]">
          Una hora de entrenamiento que mejora las otras veintitrés horas del día. No entrenamos más.{" "}
          <span className="text-bone font-bold">Entrenamos mejor.</span>
        </p>
      </Container>
    </section>
  );
}
