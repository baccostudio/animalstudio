import type { Metadata } from "next";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { LEGAL } from "@/content/legal";

export const metadata: Metadata = {
  title: "Política de privacidad — Animal Studio",
  description: "Cómo Animal Studio trata los datos personales que dejás en el formulario de contacto.",
};

const H2 = "mt-10 mb-3 text-[22px]";
const P = "text-[16px] leading-[1.7] text-charcoal";
const UL = "mt-2 list-disc pl-6 flex flex-col gap-1.5 text-[16px] leading-[1.7] text-charcoal";

export default function PrivacidadPage() {
  return (
    <>
      <SiteHeader variant="page" />
      <main id="top">
        <Section tone="bone" padded={false} className="pt-[160px] pb-[clamp(72px,10vw,140px)]">
          <Container className="max-w-[780px]">
            <p className="font-display font-semibold uppercase tracking-[0.14em] text-[12.5px] text-navy-600">Legal</p>
            <h1 className="mt-3 text-[clamp(32px,4vw,48px)] leading-[1.05]">Política de privacidad</h1>
            <p className="mt-4 text-[14px] text-stone">Última actualización: {LEGAL.lastUpdated}</p>

            <p className={`${P} mt-8`}>
              Esta política describe cómo {LEGAL.responsable} (en adelante, &quot;Animal Studio&quot;) trata los
              datos personales que nos dejás a través del sitio web, conforme a la Ley N.º 25.326 de Protección de
              los Datos Personales de la República Argentina y sus normas complementarias.
            </p>

            <h2 className={H2}>Responsable del tratamiento</h2>
            <p className={P}>
              {LEGAL.responsable}, con domicilio en {LEGAL.domicilio}. Contacto para cuestiones de privacidad:{" "}
              {LEGAL.email}.
            </p>

            <h2 className={H2}>Qué datos recolectamos</h2>
            <ul className={UL}>
              <li>Los que completás en el formulario: nombre completo, email y número de celular.</li>
              <li>El plan por el que consultaste y desde qué botón del sitio abriste el formulario.</li>
              <li>
                Datos de origen de la visita: página de llegada, sitio de referencia y parámetros de campaña (UTM), si
                los hubiera.
              </li>
              <li>Dirección IP, usada únicamente para prevenir envíos automatizados o abusivos.</li>
            </ul>

            <h2 className={H2}>Para qué los usamos</h2>
            <ul className={UL}>
              <li>Para que un asesor de Animal Studio te contacte y te brinde información sobre planes y visitas.</li>
              <li>Para saber por qué canales llegan las consultas y mejorar nuestra comunicación.</li>
            </ul>
            <p className={`${P} mt-3`}>
              La base legal del tratamiento es tu consentimiento, que prestás al enviar el formulario. No usamos tus
              datos para otras finalidades ni los vendemos.
            </p>

            <h2 className={H2}>Con quién los compartimos</h2>
            <p className={P}>
              Tus datos se almacenan en la plataforma de mensajería y gestión de contactos que usa nuestro equipo
              comercial (respond.io), que actúa como encargado del tratamiento y puede alojar la información fuera de
              la Argentina, en países o bajo mecanismos que garantizan un nivel adecuado de protección.
            </p>

            <h2 className={H2}>Cuánto tiempo los conservamos</h2>
            <p className={P}>
              Conservamos tus datos mientras dure la gestión comercial de tu consulta y, como máximo, por el plazo
              necesario para cumplir obligaciones legales. Podés pedir su supresión en cualquier momento.
            </p>

            <h2 className={H2}>Tus derechos</h2>
            <p className={P}>
              Podés ejercer en forma gratuita los derechos de acceso, rectificación, actualización y supresión de tus
              datos escribiendo a {LEGAL.email}. El titular de los datos tiene la facultad de ejercer el derecho de
              acceso a los mismos en forma gratuita a intervalos no inferiores a seis meses, salvo que se acredite un
              interés legítimo al efecto, conforme lo establecido en el artículo 14, inciso 3 de la Ley N.º 25.326.
            </p>
            <p className={`${P} mt-3`}>
              La Agencia de Acceso a la Información Pública, órgano de control de la Ley N.º 25.326, tiene la
              atribución de atender las denuncias y reclamos que se interpongan con relación al incumplimiento de las
              normas sobre protección de datos personales.
            </p>

            <h2 className={H2}>Cookies y almacenamiento local</h2>
            <p className={P}>
              El sitio no usa cookies de seguimiento de terceros. Guardamos en el almacenamiento de sesión de tu
              navegador los datos de origen de la visita (parámetros de campaña y sitio de referencia) únicamente para
              adjuntarlos a tu consulta si decidís enviarla; se borran al cerrar el navegador.
            </p>

            <h2 className={H2}>Cambios</h2>
            <p className={P}>
              Podemos actualizar esta política. Publicaremos la versión vigente en esta misma página con su fecha de
              actualización.
            </p>
          </Container>
        </Section>
      </main>
      <SiteFooter />
    </>
  );
}
