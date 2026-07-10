import { Hero } from "@/components/sections/Hero";
import { FeatureGrid } from "@/components/sections/FeatureGrid";
import { KineticProofDeck } from "@/components/sections/KineticProofDeck";
import { ParadigmShift } from "@/components/sections/ParadigmShift";
import { Problems } from "@/components/sections/Problems";
import { TrustArchitecture } from "@/components/sections/TrustArchitecture";
import { ConversionTerminal } from "@/components/sections/ConversionTerminal";
import { JoinWaitlist } from "@/components/sections/JoinWaitlist";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Hero — headline, interactive city/location discovery search + live results carousel */}
      <Hero />

      {/* 2. Feature grid — everything Fynd does, at a glance */}
      <FeatureGrid />

      {/* 3. Kinetic proof deck — editorial grid of real places */}
      <KineticProofDeck />

      {/* 4. Paradigm shift — how the matching actually works */}
      <ParadigmShift />

      {/* 5. Who it's for — personas / use cases */}
      <Problems />

      {/* 6. Trust architecture — bento grid of trust signals */}
      <TrustArchitecture />

      {/* 7. Conversion terminal — single CTA to open the web app */}
      <ConversionTerminal />

      {/* 8. Join the waitlist — native app email capture */}
      <JoinWaitlist />

      {/* 9. Footer */}
      <Footer />
    </>
  );
}
