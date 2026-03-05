import { Navigation } from "@/components/sections/Navigation";
import { Hero } from "@/components/sections/Hero";
import { Problems } from "@/components/sections/Problems";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { ProductPreview } from "@/components/sections/ProductPreview";
import { Features } from "@/components/sections/Features";
import { Footer } from "@/components/sections/Footer";
import { NewsletterPopup } from "@/components/NewsletterPopup";

export default function Home() {
  return (
    <>
      <Navigation />
      <Hero />
      <Problems />
      <HowItWorks />
      <ProductPreview />
      <Features />
      <Footer />
      <NewsletterPopup />
    </>
  );
}
