export type Review = {
  quote: string;
  author: string;
  /** Placeholder copy waiting for real Google reviews */
  pending?: boolean;
};

export const GOOGLE_STAT = {
  value: "—",
  label: "puntaje real en reseñas de Google.",
  note: "Pendiente: pasanos el puntaje y el link real de Google Maps de Animal Studio.",
  pending: true,
};

export const REVIEWS: Review[] = [
  {
    quote:
      "\"Pegá acá el texto real de una reseña de Google — la cargamos tal cual, con nombre y estrellas.\"",
    author: "Reseña 1 · a confirmar",
    pending: true,
  },
  {
    quote: "\"Pegá acá el texto real de otra reseña de Google.\"",
    author: "Reseña 2 · a confirmar",
    pending: true,
  },
  {
    quote: "\"Pegá acá el texto real de una tercera reseña de Google.\"",
    author: "Reseña 3 · a confirmar",
    pending: true,
  },
];
