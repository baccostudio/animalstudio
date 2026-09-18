import type { StaticImageData } from "next/image";
import wall from "@/public/images/gallery-render-wall.jpg";
import cardio from "@/public/images/instalaciones-cardio.jpg";
import mirror from "@/public/images/gallery-render-mirror.jpg";
import floor1 from "@/public/images/gallery-render-floor1.jpg";
import reception from "@/public/images/gallery-render-reception.jpg";
import floor2 from "@/public/images/gallery-render-floor2.jpg";
import weights from "@/public/images/gallery-render-weights.jpg";
import lounge from "@/public/images/instalaciones-lounge.jpg";
import floor3 from "@/public/images/gallery-render-floor3.jpg";
import wallNight from "@/public/images/gallery-render-wall-night.jpg";

export type GalleryItem = {
  /** Grid area name (a–j), matches Gallery.module.css */
  area: "a" | "b" | "c" | "d" | "e" | "f" | "g" | "h" | "i" | "j";
  src: StaticImageData;
  alt: string;
  caption: string;
  /** Hint for next/image srcset selection at each breakpoint */
  sizes: string;
};

const HALF = "(max-width: 700px) 100vw, 50vw";
const QUARTER = "(max-width: 700px) 100vw, (max-width: 980px) 50vw, 25vw";

export const GALLERY: GalleryItem[] = [
  { area: "a", src: wall, alt: "Pared de bienvenida Animal Studio con póster Disciplina", caption: "Animal Studio", sizes: HALF },
  { area: "b", src: cardio, alt: "Sala de cardio Animal Studio", caption: "Sala de cardio", sizes: QUARTER },
  { area: "c", src: mirror, alt: "Sala de entrenamiento funcional Animal Studio", caption: "Entrenamiento funcional", sizes: QUARTER },
  { area: "d", src: floor1, alt: "Piso de entrenamiento con branding Animal Studio", caption: "Piso Animal", sizes: "(max-width: 700px) 100vw, (max-width: 980px) 100vw, 50vw" },
  { area: "e", src: reception, alt: "Recepción Animal Studio", caption: "Recepción", sizes: "(max-width: 700px) 100vw, (max-width: 980px) 100vw, 50vw" },
  { area: "f", src: floor2, alt: "Sala de pesas con branding Animal Studio en el piso", caption: "Sala de pesas", sizes: HALF },
  { area: "g", src: weights, alt: "Zona de peso libre Animal Studio", caption: "Peso libre", sizes: QUARTER },
  { area: "h", src: lounge, alt: "Lounge Animal Studio", caption: "Espacios de descanso", sizes: QUARTER },
  { area: "i", src: floor3, alt: "Vista general del piso de entrenamiento Animal Studio", caption: "Vista general", sizes: HALF },
  { area: "j", src: wallNight, alt: "Pared Animal Studio, versión nocturna", caption: "Detalle de marca", sizes: HALF },
];
