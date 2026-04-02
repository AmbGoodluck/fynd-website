// Navigation is rendered globally by src/app/layout.tsx — do not import it here
import { Button } from "@/components/ui/Button";
import { CheckCircle, MapPin, Smartphone, Shield, Navigation2, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">

      {/* Hero */}
      <section className="py-20 px-4 sm:px-8 md:px-16 text-center bg-gradient-to-br from-green-50 to-white">
        <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-4">
          What Fynd can do
        </p>
        <h1 className="text-4xl md:text-5xl font-bold mb-5 text-gray-900 leading-tight">
          Everything Fynd can do.
        </h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          AI-powered place discovery, built for the way people actually explore — whether you&apos;re a local, a traveler, or somewhere in between.
        </p>
      </section>

      {/* Core Features */}
      <section className="max-w-4xl mx-auto py-12 px-4 grid gap-10 md:gap-14">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><MapPin className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">AI-powered place discovery</h2>
            <p className="text-gray-600 mb-2">Fynd surfaces interesting places, hidden gems, and local favorites near you — tailored to your interests, mood, and location.</p>
            <p className="text-sm text-green-700 font-medium">Find spots worth visiting without spending hours searching.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex-shrink-0"><Zap className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Smart filters that actually help</h2>
            <p className="text-gray-600 mb-2">Narrow by mood, time of day, distance, and budget until the results feel made for you — not just algorithmically popular.</p>
            <p className="text-sm text-green-700 font-medium">Spend less time filtering. Get to exploring faster.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><Navigation2 className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Built-in navigation</h2>
            <p className="text-gray-600 mb-2">Navigate to any spot directly from the app, or open in Google Maps with one tap. No copy-pasting addresses.</p>
            <p className="text-sm text-green-700 font-medium">From discovery to directions, without switching apps.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex-shrink-0"><Smartphone className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Clean, intuitive design</h2>
            <p className="text-gray-600 mb-2">Every screen is designed to get you to the right place faster — not buried in menus or feature overload.</p>
            <p className="text-sm text-green-700 font-medium">Less figuring out. More exploring.</p>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><Shield className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-2">Private and reliable</h2>
            <p className="text-gray-600 mb-2">Your data stays yours. Fynd is built with privacy as a default — no account required to start, and no unnecessary data collection.</p>
            <p className="text-sm text-green-700 font-medium">Explore freely. Your information stays private.</p>
          </div>
        </div>
      </section>

      {/* Why Fynd */}
      <section className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Why people choose Fynd</h2>
        <ul className="grid gap-4 md:grid-cols-2 text-left">
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-fynd mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Discover places matched to your actual interests, not trending lists</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-fynd mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Go from zero to a personalized map in seconds</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-fynd mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Navigate efficiently without switching apps</span>
          </li>
          <li className="flex items-start gap-3">
            <CheckCircle className="w-5 h-5 text-fynd mt-0.5 flex-shrink-0" />
            <span className="text-gray-700">Free to start — no account required to explore</span>
          </li>
        </ul>
      </section>

      {/* Download CTA */}
      <section className="py-16 px-4 bg-gradient-to-t from-green-50 to-white text-center">
        <p className="text-sm font-semibold text-green-600 uppercase tracking-widest mb-4">
          Ready to explore?
        </p>
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-gray-900">Start using Fynd today.</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
          <a href="https://androidv1.fyndplaces.com/app-release.apk" download>
            <Button variant="primary" size="lg" className="w-56">Download for Android</Button>
          </a>
          {/* iOS coming soon — placeholder link disabled */}
          <Button variant="secondary" size="lg" className="w-56 opacity-60 cursor-not-allowed" disabled>
            iOS — Coming soon
          </Button>
          <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="lg" className="w-56">Try the web app</Button>
          </a>
        </div>
        <p className="mt-5 text-sm text-gray-400">
          Android app available now &middot; iOS coming soon &middot; Web app works on any browser
        </p>
      </section>

    </main>
  );
}
