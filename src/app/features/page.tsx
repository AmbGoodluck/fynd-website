import { Button } from "@/components/ui/Button";
import { Navigation } from "@/components/sections/Navigation";
import { Footer } from "@/components/sections/Footer";
import { CheckCircle, MapPin, Smartphone, Shield, Navigation2, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-canvas text-ink pt-16">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-8 md:px-16 text-center bg-surface">
        <h1 className="text-4xl md:text-5xl mb-4">Discover What Fynd Can Do</h1>
        <p className="text-lg md:text-xl text-ink-muted max-w-2xl mx-auto">
          Fynd is your smart travel companion—find new places, get real-time navigation, and enjoy a seamless, secure experience across all your devices.
        </p>
      </section>

      {/* Core Features */}
      <section className="max-w-4xl mx-auto py-12 px-4 grid gap-10 md:gap-14">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-3xl p-8">
          <div className="flex-shrink-0"><MapPin className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl mb-1">Smart Location Discovery</h2>
            <p className="text-ink-muted mb-1">Instantly find interesting places, hidden gems, and trending spots near you — picked for your taste.</p>
            <p className="text-sm text-ink-muted/70">Benefit: Never miss out on what’s around you—explore smarter, not harder.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface-raised rounded-3xl p-8 ring-1 ring-hairline">
          <div className="flex-shrink-0"><Zap className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl mb-1">Nearby Deals & Opportunities</h2>
            <p className="text-ink-muted mb-1">Get real-time alerts for local deals, events, and opportunities tailored to your interests and location.</p>
            <p className="text-sm text-ink-muted/70">Benefit: Save money and time by catching the best offers as you go.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-3xl p-8">
          <div className="flex-shrink-0"><Navigation2 className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl mb-1">Real-Time Navigation</h2>
            <p className="text-ink-muted mb-1">Navigate confidently with live directions, traffic updates, and smart rerouting for the fastest, safest routes.</p>
            <p className="text-sm text-ink-muted/70">Benefit: Arrive faster and stress-free, wherever you go.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface-raised rounded-3xl p-8 ring-1 ring-hairline">
          <div className="flex-shrink-0"><Smartphone className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl mb-1">User-Friendly Interface</h2>
            <p className="text-ink-muted mb-1">Enjoy a clean, intuitive design that makes planning and exploring effortless for everyone.</p>
            <p className="text-sm text-ink-muted/70">Benefit: Spend less time figuring things out and more time enjoying your journey.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-surface rounded-3xl p-8">
          <div className="flex-shrink-0"><Shield className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl mb-1">Secure and Reliable Experience</h2>
            <p className="text-ink-muted mb-1">Your data is protected with industry-leading security and privacy standards. Fynd is built for reliability and peace of mind.</p>
            <p className="text-sm text-ink-muted/70">Benefit: Explore with confidence—your privacy and safety come first.</p>
          </div>
        </div>
      </section>

      {/* Why Use Fynd */}
      <section className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl mb-4">Why Use Fynd?</h2>
        <ul className="grid gap-4 md:grid-cols-2 text-left md:text-center text-ink-muted">
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd flex-shrink-0" />Save time on planning and navigation</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd flex-shrink-0" />Discover new places and experiences</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd flex-shrink-0" />Navigate efficiently with real-time updates</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd flex-shrink-0" />Improve your daily adventures and routines</li>
        </ul>
      </section>

      {/* Open Web App Section */}
      <section className="py-16 px-4 bg-surface text-center">
        <h2 className="text-2xl md:text-3xl mb-6">Start Using Fynd Today</h2>
        <div className="flex justify-center items-center max-w-xl mx-auto">
          <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-56">Open Web Version</Button>
          </a>
        </div>
      </section>
      </main>
      <Footer />
    </>
  );
}
