import Image from "next/image";
import hero from "@/public/images/hero-silhouette.jpg";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { LeadTrigger } from "@/components/lead/LeadTrigger";

export function Hero() {
  return (
    <section className="relative min-h-svh flex items-end overflow-hidden bg-navy-950">
      <div className="hero-overlay absolute inset-0 overflow-hidden">
        <Image
          src={hero}
          alt="Atleta en movimiento, silueta desenfocada sobre fondo azul"
          fill
          sizes="100vw"
          preload
          fetchPriority="high"
          className="object-cover object-[center_20%] animate-kenburns"
        />
      </div>

      <Container className="relative z-[2] w-full pt-[calc(var(--spacing-gutter)+90px)] pb-[76px] flex flex-col gap-7">
        <Eyebrow className="reveal in text-navy-200 opacity-[.92]">
          The future of training, the luxury of longevity.
        </Eyebrow>
        <h1 className="reveal in font-body text-bone font-extrabold text-[clamp(40px,8vw,96px)] leading-[0.98] tracking-[-0.02em] max-w-none md:max-w-[16ch]">
          EL FUTURO NO SE ESPERA.
          <br />
          <em className="not-italic text-navy-200">SE ENTRENA.</em>
        </h1>
        <p className="reveal in text-mist text-[clamp(15px,1.7vw,19px)] max-w-[46ch] leading-[1.55]">
          Animal Studio es un Longevity Performance Club: entrenamiento, ciencia y comunidad en una sola
          experiencia, pensada para construir el cuerpo que te va a acompañar el resto de tu vida.
        </p>
        <div className="reveal in flex items-center gap-[18px] flex-wrap mt-1.5">
          <LeadTrigger cta="hero" variant="primary">
            Empezá tu prueba
          </LeadTrigger>
          <Button variant="outline" href="#manifiesto">
            Conocé Animal
          </Button>
        </div>
      </Container>

      <div className="absolute right-gutter bottom-7 z-[2] flex items-center gap-2.5 text-navy-200 text-[12px] tracking-[0.12em] uppercase font-display font-semibold">
        <span>Scroll</span>
        <span className="w-px h-[34px] bg-[linear-gradient(var(--color-navy-200),transparent)] animate-scrollline" />
      </div>
    </section>
  );
}
