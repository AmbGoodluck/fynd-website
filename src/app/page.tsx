import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Features } from "@/components/sections/Features";
import { Problems } from "@/components/sections/Problems";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { SocialProof } from "@/components/sections/SocialProof";
import { IdeasSection } from "@/components/sections/IdeasSection";
import { DownloadCTA } from "@/components/sections/DownloadCTA";
import { Footer } from "@/components/sections/Footer";

export default function Home() {
  return (
    <>
      {/* 1. Hero — headline, phone mockup, dual CTAs */}
      <Hero />

      {/* 2. How it works — 3-step explainer + demo video */}
      <HowItWorks />

      {/* 3. Features — 4 capability cards */}
      <Features />

      {/* 4. Who it's for — personas / use cases */}
      <Problems />

      {/* 5. Product tour — screenshot carousel with captions */}
      <ProductPreview />

      {/* 6. Social proof — testimonials + key metrics */}
      <SocialProof />

      {/* 7. Ideas — inspiration card grid */}
      <IdeasSection />

      {/* 8. Download CTA band — app store + web app */}
      <DownloadCTA />

      {/* 9. Footer */}
      <Footer />
    </>
  );
}
