import { Button } from "@/components/ui/Button";
import { CheckCircle, MapPin, Smartphone, Shield, Navigation2, Zap } from "lucide-react";

export default function FeaturesPage() {
  return (
    <main className="min-h-screen bg-white text-gray-900">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-8 md:px-16 text-center bg-gradient-to-br from-green-50 to-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Discover What Fynd Can Do</h1>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Fynd v1.0 is your smart travel companion—find new places, get real-time navigation, and enjoy a seamless, secure experience across all your devices.
        </p>
      </section>

      {/* Core Features */}
      <section className="max-w-4xl mx-auto py-12 px-4 grid gap-10 md:gap-14">
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><MapPin className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">Smart Location Discovery</h2>
            <p className="text-gray-600 mb-1">Instantly find interesting places, hidden gems, and trending spots near you with AI-powered recommendations.</p>
            <p className="text-sm text-gray-500">Benefit: Never miss out on what’s around you—explore smarter, not harder.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex-shrink-0"><Zap className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">Nearby Deals & Opportunities</h2>
            <p className="text-gray-600 mb-1">Get real-time alerts for local deals, events, and opportunities tailored to your interests and location.</p>
            <p className="text-sm text-gray-500">Benefit: Save money and time by catching the best offers as you go.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><Navigation2 className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">Real-Time Navigation</h2>
            <p className="text-gray-600 mb-1">Navigate confidently with live directions, traffic updates, and smart rerouting for the fastest, safest routes.</p>
            <p className="text-sm text-gray-500">Benefit: Arrive faster and stress-free, wherever you go.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
          <div className="flex-shrink-0"><Smartphone className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">User-Friendly Interface</h2>
            <p className="text-gray-600 mb-1">Enjoy a clean, intuitive design that makes planning and exploring effortless for everyone.</p>
            <p className="text-sm text-gray-500">Benefit: Spend less time figuring things out and more time enjoying your journey.</p>
          </div>
        </div>
        <div className="flex flex-col md:flex-row items-center gap-6 md:gap-10 bg-green-50 rounded-3xl p-8 shadow-sm">
          <div className="flex-shrink-0"><Shield className="w-10 h-10 text-fynd" /></div>
          <div>
            <h2 className="text-2xl font-semibold mb-1">Secure and Reliable Experience</h2>
            <p className="text-gray-600 mb-1">Your data is protected with industry-leading security and privacy standards. Fynd is built for reliability and peace of mind.</p>
            <p className="text-sm text-gray-500">Benefit: Explore with confidence—your privacy and safety come first.</p>
          </div>
        </div>
      </section>

      {/* Why Use Fynd */}
      <section className="max-w-3xl mx-auto py-12 px-4 text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Why Use Fynd?</h2>
        <ul className="grid gap-4 md:grid-cols-2 text-left md:text-center">
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd" />Save time on planning and navigation</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd" />Discover new places and experiences</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd" />Navigate efficiently with real-time updates</li>
          <li className="flex items-center gap-2 justify-center md:justify-start"><CheckCircle className="w-5 h-5 text-fynd" />Improve your daily adventures and routines</li>
        </ul>
      </section>

      {/* Download Options Section */}
      <section className="py-16 px-4 bg-gradient-to-t from-green-50 to-white text-center">
        <h2 className="text-2xl md:text-3xl font-bold mb-6">Start Using Fynd Today</h2>
        <div className="flex flex-col md:flex-row gap-4 justify-center items-center max-w-xl mx-auto">
          <a href="/downloads/fynd-android-v1.apk" download>
            <Button variant="primary" size="lg" className="w-56">Download for Android</Button>
          </a>
          <a href="https://testflight.apple.com/join/your-link" target="_blank" rel="noopener noreferrer">
            <Button variant="primary" size="lg" className="w-56">Download for iOS</Button>
          </a>
          <a href="https://app.fyndplaces.com" target="_blank" rel="noopener noreferrer">
            <Button variant="secondary" size="lg" className="w-56">Use Web Version</Button>
          </a>
        </div>
      </section>
    </main>
  );
}
