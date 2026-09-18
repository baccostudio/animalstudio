import Image from "next/image";
import { GALLERY } from "@/content/gallery";
import { Container } from "@/components/ui/Container";
import { Kicker } from "@/components/ui/Kicker";
import { Section } from "@/components/ui/Section";
import { SectionHead } from "@/components/ui/SectionHead";
import styles from "./Gallery.module.css";

export function Gallery() {
  return (
    <Section id="instalaciones" tone="ink">
      <Container>
        <Kicker number="03" className="reveal text-mist" />
        <SectionHead
          className="reveal items-end"
          title="El universo Animal"
          titleClassName="text-bone"
          description="Diseño, comunidad y método — la experiencia empieza antes de la primera repetición."
          descriptionClassName="text-stone"
        />
      </Container>
      <Container className="reveal mt-11">
        <div className={styles.grid}>
          {GALLERY.map((item) => (
            <figure
              key={item.area}
              style={{ gridArea: item.area }}
              className="group relative overflow-hidden bg-navy-900 m-0"
            >
              <a href="#" tabIndex={-1} className="relative block h-full">
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={item.sizes}
                  className="object-cover transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-[1.06]"
                />
              </a>
              <figcaption className="absolute inset-x-0 bottom-0 p-4 bg-[linear-gradient(to_top,rgba(12,22,34,0.75),transparent)] text-bone text-[12px] tracking-[0.06em] uppercase font-display font-medium opacity-0 translate-y-1.5 transition-[opacity,transform] duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                {item.caption}
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </Section>
  );
}
