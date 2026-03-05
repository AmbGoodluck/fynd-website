import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Fynd",
  description:
    "Read the Fynd Privacy Policy to understand how we collect, use, and protect your personal data.",
};

const sections = [
  {
    id: "introduction",
    title: "1. Introduction",
    content: (
      <p>
        Welcome to <strong>Fynd</strong> (&quot;we,&quot; &quot;our,&quot; or
        &quot;us&quot;). Fynd is a trip planning application that helps you
        discover places and build personalised travel itineraries. We are
        committed to protecting your personal information and your right to
        privacy.
        <br />
        <br />
        This Privacy Policy explains how we collect, use, disclose, and
        safeguard your information when you use our mobile application and
        related services.
      </p>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            2.1 Information You Provide
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Account Information</strong> — name, email address, and
              password when you register
            </li>
            <li>
              <strong>Profile Information</strong> — travel preferences,
              interests, and vibe settings
            </li>
            <li>
              <strong>Feedback &amp; Reviews</strong> — ratings and written
              feedback you submit through the app
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            2.2 Information Collected Automatically
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Location Data</strong> — with your permission, we collect
              your precise GPS location to power trip navigation and suggest
              nearby places
            </li>
            <li>
              <strong>Usage Data</strong> — how you interact with the app,
              screens visited, features used, and time spent
            </li>
            <li>
              <strong>Device Information</strong> — device type, operating
              system, and unique device identifiers
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-gray-900 mb-2">
            2.3 Information from Third Parties
          </h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-600">
            <li>
              <strong>Google</strong> — when you sign in with Google, we receive
              your name, email, and profile picture
            </li>
            <li>
              <strong>Google Places API</strong> — we use Google&apos;s services
              to surface venue details, ratings, and photos
            </li>
            <li>
              <strong>Stripe</strong> — payment information for subscription
              services is handled directly by Stripe; we never store your full
              card details
            </li>
          </ul>
        </div>
      </div>
    ),
  },
  {
    id: "how-we-use",
    title: "3. How We Use Your Information",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-gray-600">
        <li>Create and manage your account</li>
        <li>
          Generate personalised trip itineraries and place recommendations
        </li>
        <li>Provide real-time navigation and location-aware features</li>
        <li>Process subscription payments securely via Stripe</li>
        <li>Analyse app performance and improve our services</li>
        <li>Respond to your feedback and support requests</li>
        <li>Send important service updates and notifications</li>
        <li>Comply with legal obligations</li>
      </ul>
    ),
  },
  {
    id: "how-we-share",
    title: "4. How We Share Your Information",
    content: (
      <p>
        We <strong>do not sell</strong> your personal information. We may share
        your data only in the following circumstances:
        <br />
        <br />
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <strong>Service Providers</strong> — trusted third parties that help
            us operate the app (Firebase, Google, Stripe, OpenAI) under strict
            data processing agreements
          </li>
          <li>
            <strong>Legal Requirements</strong> — if required by law, court
            order, or government authority
          </li>
          <li>
            <strong>Business Transfers</strong> — in the event of a merger,
            acquisition, or sale of assets, your data may be transferred with
            appropriate notice
          </li>
          <li>
            <strong>With Your Consent</strong> — for any other purpose with your
            explicit consent
          </li>
        </ul>
      </p>
    ),
  },
  {
    id: "data-storage",
    title: "5. Data Storage & Security",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-gray-600">
        <li>
          Your data is stored securely on{" "}
          <strong>Google Firebase</strong> infrastructure with encryption at
          rest and in transit
        </li>
        <li>
          We implement industry-standard security measures including HTTPS/TLS
          encryption
        </li>
        <li>
          Access to personal data is restricted to authorised personnel only
        </li>
        <li>
          While we strive to protect your information, no method of transmission
          over the internet is 100% secure
        </li>
      </ul>
    ),
  },
  {
    id: "location",
    title: "6. Location Data",
    content: (
      <p>
        The Fynd app requests access to your device&apos;s location to display
        your position on trip maps, provide walking distances and navigation
        guidance, and suggest places near your current location.
        <br />
        <br />
        Location access is only active while you are using the app. You may
        revoke location permissions at any time through your device settings,
        though this will limit certain features.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "7. Data Retention",
    content: (
      <p>
        We retain your personal data for as long as your account is active or
        as needed to provide our services. You may request deletion of your
        account and associated data at any time through the app&apos;s{" "}
        <strong>Account Settings &rarr; Delete Account</strong> section.
      </p>
    ),
  },
  {
    id: "your-rights",
    title: "8. Your Rights",
    content: (
      <div>
        <p className="mb-3">
          Depending on your location, you may have the right to:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-gray-600">
          <li>
            <strong>Access</strong> — request a copy of the personal data we
            hold about you
          </li>
          <li>
            <strong>Correction</strong> — request correction of inaccurate or
            incomplete data
          </li>
          <li>
            <strong>Deletion</strong> — request deletion of your personal data
          </li>
          <li>
            <strong>Portability</strong> — receive your data in a structured,
            machine-readable format
          </li>
          <li>
            <strong>Objection</strong> — object to certain processing of your
            data
          </li>
          <li>
            <strong>Withdraw Consent</strong> — where processing is based on
            consent, you may withdraw it at any time
          </li>
        </ul>
        <p className="mt-3">
          To exercise any of these rights, contact us at{" "}
          <a
            href="mailto:privacy@fyndplaces.com"
            className="text-fynd hover:underline"
          >
            privacy@fyndplaces.com
          </a>
        </p>
      </div>
    ),
  },
  {
    id: "children",
    title: "9. Children's Privacy",
    content: (
      <p>
        Fynd is not intended for children under the age of <strong>13</strong>.
        We do not knowingly collect personal information from children. If you
        believe a child has provided us with personal information, please
        contact us and we will promptly delete it.
      </p>
    ),
  },
  {
    id: "third-party",
    title: "10. Third-Party Services",
    content: (
      <div>
        <p className="mb-3">
          Our app integrates with the following third-party services, each
          governed by their own privacy policies:
        </p>
        <ul className="space-y-1">
          {[
            {
              label: "Google Privacy Policy",
              href: "https://policies.google.com/privacy",
            },
            {
              label: "Firebase Privacy Policy",
              href: "https://firebase.google.com/support/privacy",
            },
            {
              label: "Stripe Privacy Policy",
              href: "https://stripe.com/privacy",
            },
            {
              label: "OpenAI Privacy Policy",
              href: "https://openai.com/privacy",
            },
          ].map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-fynd hover:underline"
              >
                {link.label} &rarr;
              </a>
            </li>
          ))}
        </ul>
      </div>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to This Policy",
    content: (
      <p>
        We may update this Privacy Policy from time to time. We will notify you
        of any significant changes by updating the &quot;Last Updated&quot; date
        and, where appropriate, sending an in-app notification. Your continued
        use of Fynd after changes are posted constitutes your acceptance of the
        updated policy.
      </p>
    ),
  },
  {
    id: "contact",
    title: "12. Contact Us",
    content: (
      <div className="space-y-1">
        <p>
          If you have any questions, concerns, or requests regarding this
          Privacy Policy, please contact us:
        </p>
        <p className="font-semibold text-gray-900 pt-2">Fynd</p>
        <p>
          📧{" "}
          <a
            href="mailto:privacy@fyndplaces.com"
            className="text-fynd hover:underline"
          >
            privacy@fyndplaces.com
          </a>
        </p>
        <p>
          🌐{" "}
          <a
            href="https://www.fyndplaces.com"
            className="text-fynd hover:underline"
          >
            www.fyndplaces.com
          </a>
        </p>
      </div>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="border-b border-gray-100 px-4 sm:px-6 lg:px-8 py-5">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="text-2xl font-bold text-fynd">
            Fynd
          </Link>
          <Link
            href="/"
            className="text-sm text-gray-500 hover:text-fynd transition"
          >
            &larr; Back to Home
          </Link>
        </div>
      </header>

      {/* Hero */}
      <div className="bg-gradient-to-br from-slate-50 to-green-50 py-14 md:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="text-sm font-medium text-fynd uppercase tracking-widest mb-3">
            Legal
          </p>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            <strong>Effective Date:</strong> March 4, 2026 &nbsp;&bull;&nbsp;
            <strong>Last Updated:</strong> March 4, 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Table of Contents */}
        <nav className="mb-14 p-6 bg-gray-50 rounded-2xl border border-gray-100">
          <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-gray-600 hover:text-fynd transition"
                >
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="space-y-12">
          {sections.map((s) => (
            <section key={s.id} id={s.id} className="scroll-mt-8">
              <h2 className="text-xl font-bold text-gray-900 mb-4 pb-2 border-b border-gray-100">
                {s.title}
              </h2>
              <div className="text-gray-600 leading-relaxed">{s.content}</div>
            </section>
          ))}
        </div>

        <p className="mt-16 pt-8 border-t border-gray-100 text-sm text-gray-400 text-center">
          This Privacy Policy was last updated on March 4, 2026.
        </p>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-center py-8 px-4 sm:px-6">
        <p className="text-gray-400 text-sm">
          &copy; 2026 Fynd. All rights reserved. &nbsp;&bull;&nbsp;
          <Link href="/privacy" className="text-fynd hover:underline">
            Privacy Policy
          </Link>
          &nbsp;&bull;&nbsp;
          <Link href="/terms-of-service" className="text-fynd hover:underline">
            Terms of Service
          </Link>
        </p>
      </footer>
    </div>
  );
}
