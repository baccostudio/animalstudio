import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "./site";

export type ContactRow = {
  label: string;
  value: string;
  href?: string;
  /** Placeholder waiting for confirmed data */
  pending?: boolean;
};

export const CONTACT_ROWS: ContactRow[] = [
  { label: "Dirección", value: "A confirmar con el equipo Animal", pending: true },
  { label: "Instagram", value: INSTAGRAM_HANDLE, href: INSTAGRAM_URL },
  { label: "Contacto", value: "Email / WhatsApp a confirmar", pending: true },
];
