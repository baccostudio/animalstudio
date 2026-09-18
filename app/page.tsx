import { IntroSplash } from "@/components/layout/IntroSplash";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Breaker } from "@/components/sections/Breaker";
import { Pillars } from "@/components/sections/Pillars";
import { Gallery } from "@/components/sections/Gallery";
import { Plans } from "@/components/sections/Plans";
import { Community } from "@/components/sections/Community";
import { Contact } from "@/components/sections/Contact";
import { RevealObserver } from "@/components/effects/RevealObserver";

export default function Home() {
  return (
    <>
      <IntroSplash />
      <SiteHeader />
      <main id="top">
        <Hero />
        <Manifesto />
        <Breaker />
        <Pillars />
        <Gallery />
        <Plans />
        <Community />
        <Contact />
      </main>
      <SiteFooter />
      <RevealObserver />
    </>
  );
}
