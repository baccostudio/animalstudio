import type { Metadata } from "next";
import { Chakra_Petch, Inter } from "next/font/google";
import { AttributionCapture } from "@/components/effects/AttributionCapture";
import { LeadModalProvider } from "@/components/lead/LeadModalProvider";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const chakraPetch = Chakra_Petch({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-chakra",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Animal Studio",
  description:
    "Animal Studio es un Longevity Performance Club: entrenamiento, ciencia y comunidad en una sola experiencia, pensada para construir el cuerpo que te va a acompañar el resto de tu vida.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es" className={`${inter.variable} ${chakraPetch.variable}`} suppressHydrationWarning>
      <head>
        {/* Marks JS availability before first paint so reveal animations don't flash (see globals.css) */}
        <script dangerouslySetInnerHTML={{ __html: "document.documentElement.classList.add('js')" }} />
      </head>
      <body>
        <AttributionCapture />
        <LeadModalProvider>{children}</LeadModalProvider>
      </body>
    </html>
  );
}
