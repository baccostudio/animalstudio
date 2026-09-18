export const INSTAGRAM_URL = "https://instagram.com/animal.studio";
export const INSTAGRAM_HANDLE = "@animal.studio";

// Anchors are prefixed with "/" so they also work from subpages like /privacidad
export const NAV_LINKS = [
  { href: "/#manifiesto", label: "Manifiesto" },
  { href: "/#metodo", label: "Método" },
  { href: "/#instalaciones", label: "Instalaciones" },
  { href: "/#planes", label: "Planes" },
  { href: "/#contacto", label: "Contacto" },
] as const;

export const FOOTER_TAGLINE = "longevity is the new luxury.";
export const FOOTER_LEGAL = "Animal Studio © 2026";

export type FooterLink = {
  href: string;
  label: string;
  /** Opens in a new tab */
  external?: boolean;
  /** Internal route rendered with next/link */
  internal?: boolean;
  /** Opens the lead modal */
  lead?: boolean;
};
export type FooterColumn = { title: string; links: FooterLink[] };

export const FOOTER_COLUMNS: FooterColumn[] = [
  {
    title: "Sitio",
    links: [
      { href: "/#manifiesto", label: "Manifiesto" },
      { href: "/#metodo", label: "Método" },
      { href: "/#instalaciones", label: "Instalaciones" },
      { href: "/#planes", label: "Planes" },
    ],
  },
  {
    title: "Animal",
    links: [
      { href: "/#contacto", label: "Contacto" },
      { href: INSTAGRAM_URL, label: "Instagram", external: true },
      { href: "/privacidad", label: "Privacidad", internal: true },
    ],
  },
  {
    title: "Sumate",
    links: [
      { href: "/#planes", label: "Ver planes" },
      { href: "#", label: "Empezá tu prueba", lead: true },
    ],
  },
];
