import Link from "next/link";
import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Terms of Service | Fynd",
  description:
    "Read the Fynd Terms of Service to understand the rules and conditions governing your use of the platform.",
};

const sections = [
  {
    id: "about",
    title: "1. About Fynd",
    content: (
      <p>
        Fynd is a travel discovery platform designed to help users explore
        places, build itineraries, and discover experiences using AI-powered
        suggestions.
        <br />
        <br />
        Fynd provides informational recommendations only and does not guarantee
        the accuracy, availability, or suitability of any suggested location,
        business, or service.
      </p>
    ),
  },
  {
    id: "acceptance",
    title: "2. Acceptance of Terms",
    content: (
      <div>
        <p className="mb-3">
          By accessing or using the Service, you confirm that:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>You are at least 13 years of age.</li>
          <li>You agree to comply with these Terms.</li>
          <li>You will use the Service only for lawful purposes.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "use-of-service",
    title: "3. Use of the Service",
    content: (
      <div>
        <p className="mb-3">
          Fynd grants you a limited, non-exclusive, non-transferable license to
          access and use the Service for personal, non-commercial purposes.
        </p>
        <p className="mb-3">You agree not to:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>
            Copy, modify, or distribute any part of the Service without
            permission.
          </li>
          <li>Use the Service for unlawful or harmful activities.</li>
          <li>
            Attempt to interfere with or disrupt the Service or its
            infrastructure.
          </li>
          <li>Attempt to reverse engineer or exploit the platform.</li>
        </ul>
      </div>
    ),
  },
  {
    id: "content",
    title: "4. Content and Information",
    content: (
      <div>
        <p className="mb-3">
          Fynd aggregates information from various public sources and uses
          artificial intelligence to generate travel suggestions.
        </p>
        <p className="mb-3">Because of this:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted mb-3">
          <li>Information may occasionally be inaccurate or outdated.</li>
          <li>
            Businesses, locations, or services may change without notice.
          </li>
          <li>
            Fynd does not guarantee availability or quality of recommended
            places.
          </li>
        </ul>
        <p>
          Users are responsible for verifying information before visiting
          locations.
        </p>
      </div>
    ),
  },
  {
    id: "third-party",
    title: "5. Third-Party Services",
    content: (
      <div>
        <p className="mb-3">
          The Service may include links to third-party websites, maps, or
          services such as:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted mb-3">
          <li>Google Maps</li>
          <li>Travel websites</li>
          <li>Tourism blogs</li>
          <li>Local businesses</li>
        </ul>
        <p className="mb-2">
          Fynd is not responsible for the content, policies, or services of
          third-party providers.
        </p>
        <p>Your use of those services is governed by their own terms.</p>
      </div>
    ),
  },
  {
    id: "no-guarantee",
    title: "6. No Travel Guarantee",
    content: (
      <div>
        <p className="mb-3">
          Fynd provides travel suggestions for informational purposes only.
        </p>
        <p className="mb-3">Fynd does not:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted mb-3">
          <li>operate or manage any locations</li>
          <li>provide travel booking services</li>
          <li>
            guarantee safety, accessibility, or availability of locations
          </li>
        </ul>
        <p>
          Users assume all responsibility when visiting suggested locations.
        </p>
      </div>
    ),
  },
  {
    id: "intellectual-property",
    title: "7. Intellectual Property",
    content: (
      <div>
        <p className="mb-3">All content on Fynd, including:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted mb-3">
          <li>logos</li>
          <li>branding</li>
          <li>design</li>
          <li>software</li>
          <li>platform features</li>
        </ul>
        <p className="mb-2">
          are the intellectual property of Fynd and are protected by copyright
          and applicable laws.
        </p>
        <p>
          You may not reproduce or distribute any content without permission.
        </p>
      </div>
    ),
  },
  {
    id: "availability",
    title: "8. Service Availability",
    content: (
      <p>
        We strive to keep the Service available and functional, but we do not
        guarantee uninterrupted access.
        <br />
        <br />
        Fynd may modify, suspend, or discontinue parts of the Service at any
        time without notice.
      </p>
    ),
  },
  {
    id: "liability",
    title: "9. Limitation of Liability",
    content: (
      <div>
        <p className="mb-3">
          To the maximum extent permitted by law, Fynd and its affiliates shall
          not be liable for any indirect, incidental, or consequential damages
          arising from:
        </p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted mb-3">
          <li>use of the Service</li>
          <li>travel decisions made based on recommendations</li>
          <li>inaccurate information or location data</li>
          <li>third-party services linked from the platform</li>
        </ul>
        <p>Your use of the Service is at your own risk.</p>
      </div>
    ),
  },
  {
    id: "warranties",
    title: "10. Disclaimer of Warranties",
    content: (
      <div>
        <p className="mb-3">
          The Service is provided &quot;as is&quot; and &quot;as available.&quot;
        </p>
        <p className="mb-3">Fynd makes no warranties regarding:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>accuracy of recommendations</li>
          <li>availability of locations</li>
          <li>reliability of AI-generated suggestions</li>
        </ul>
      </div>
    ),
  },
  {
    id: "changes",
    title: "11. Changes to the Terms",
    content: (
      <p>
        We may update these Terms from time to time.
        <br />
        <br />
        If changes are made, the updated Terms will be posted on the website
        with a revised &quot;Last Updated&quot; date.
        <br />
        <br />
        Continued use of the Service after updates constitutes acceptance of
        the revised Terms.
      </p>
    ),
  },
  {
    id: "privacy",
    title: "12. Privacy",
    content: (
      <p>
        Your use of the Service is also governed by our{" "}
        <Link href="/privacy" className="text-fynd hover:underline">
          Privacy Policy
        </Link>
        , which explains how we collect and use data.
      </p>
    ),
  },
];

export default function TermsOfServicePage() {
  return (
    <div className="min-h-screen bg-canvas font-sans">
      {/* Hero */}
      <div className="bg-surface pt-28 md:pt-32 pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="mono-tag text-ink-muted mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">
            Terms of Service
          </h1>
          <p className="text-ink-muted text-sm">
            <strong>Last Updated:</strong> March 4, 2026
          </p>
          <p className="mt-4 text-ink-muted max-w-2xl">
            Welcome to Fynd. These Terms of Service (&quot;Terms&quot;) govern
            your access to and use of the Fynd website, mobile application, and
            related services (collectively, the &quot;Service&quot;). By using
            Fynd, you agree to these Terms.
            <br />
            <br />
            If you do not agree to these Terms, please do not use the Service.
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Table of Contents */}
        <nav className="mb-14 p-6 bg-surface rounded-2xl border border-hairline">
          <h2 className="text-sm font-semibold text-ink-muted uppercase tracking-wider mb-4">
            Table of Contents
          </h2>
          <ol className="space-y-1">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="text-sm text-ink-muted hover:text-fynd transition"
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
              <h2 className="text-xl text-ink mb-4 pb-2 border-b border-hairline">
                {s.title}
              </h2>
              <div className="text-ink-muted leading-relaxed">{s.content}</div>
            </section>
          ))}
        </div>

        <p className="mt-16 pt-8 border-t border-hairline text-sm text-ink-muted/70 text-center">
          These Terms of Service were last updated on March 4, 2026.
        </p>
      </main>

      <Footer />
    </div>
  );
}
