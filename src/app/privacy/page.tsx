import type { Metadata } from "next";
import { Footer } from "@/components/sections/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Fynd",
  description:
    "Read the Fynd Privacy Policy to understand how we collect, use, and protect your personal data.",
};

const Note = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-3 rounded-xl border border-hairline bg-surface px-4 py-3 text-sm text-ink-muted">
    {children}
  </div>
);

const Callout = ({ children }: { children: React.ReactNode }) => (
  <div className="mt-3 rounded-xl border-l-4 border-fynd bg-fynd/5 px-4 py-3 text-sm text-ink-muted">
    {children}
  </div>
);

const processors = [
  { provider: "Supabase", purpose: "Database, accounts, authentication, file storage" },
  { provider: "Cloudflare", purpose: "Website hosting and API layer" },
  { provider: "HERE", purpose: "Place and location data" },
  { provider: "Google", purpose: "Sign-in, and photos for some places" },
  { provider: "Apple", purpose: "Sign-in, and push notification delivery" },
  { provider: "OpenAI", purpose: "Generating place descriptions" },
  { provider: "VerifyPass", purpose: "Student enrolment verification" },
  { provider: "Sentry", purpose: "Crash and error reporting" },
  { provider: "Expo", purpose: "App delivery and push notification routing" },
  { provider: "Resend", purpose: "Transactional email" },
  { provider: "OpenStreetMap", purpose: "Map tiles and place lookup" },
  { provider: "Open-Meteo", purpose: "Weather" },
  { provider: "Unsplash / Pexels", purpose: "Stock photos used when a place has no real photo" },
  { provider: "Hipolabs", purpose: "University name lookup" },
];

const sections = [
  {
    id: "who-we-are",
    title: "1. Who We Are",
    content: (
      <div className="space-y-3">
        <p>
          Fynd is a campus discovery and social app for verified students. It
          helps you find places around your school, share recommendations,
          post events, and see what other students at your campus are talking
          about.
        </p>
        <p>
          Fynd is currently an independent student software project. It is
          not operated by a registered company, it charges nothing, and it
          makes no money.
        </p>
        <p>
          Questions about this policy:{" "}
          <a href="mailto:support@fyndplaces.com" className="text-fynd hover:underline">
            support@fyndplaces.com
          </a>
        </p>
      </div>
    ),
  },
  {
    id: "information-we-collect",
    title: "2. Information We Collect",
    content: (
      <div className="space-y-4">
        <div>
          <h3 className="font-semibold text-ink mb-2">2.1 Information you give us</h3>
          <ul className="list-disc pl-5 space-y-1 text-ink-muted">
            <li>
              <strong>Account details</strong> - your name, email address, and
              password (stored only as a cryptographic hash, never in
              readable form). If you sign in with Google or Apple, we receive
              your name and email from them and never see your password.
            </li>
            <li>
              <strong>Your content</strong> - posts, replies, events, photos,
              secrets, saved places, trips and itineraries you create.
            </li>
            <li>
              <strong>Preferences</strong> - the vibes, interests and travel
              preferences you select.
            </li>
            <li>
              <strong>Your school</strong> - if you verify as a student, we
              store which school you are enrolled at.
            </li>
            <li>
              <strong>Support messages</strong> - anything you send us through
              Support &amp; Feedback.
            </li>
          </ul>
        </div>
        <div>
          <h3 className="font-semibold text-ink mb-2">2.2 Information collected automatically</h3>
          <ul className="list-disc pl-5 space-y-1 text-ink-muted">
            <li>
              <strong>Location</strong> - only while the app is open, and only
              if you grant permission. See section 5.
            </li>
            <li>
              <strong>Usage data</strong> - which screens you open and which
              features you use, stored in our own database. We do not use
              Google Analytics, Firebase Analytics, or any advertising SDK.
            </li>
            <li>
              <strong>Diagnostics</strong> - crash reports and error traces,
              so we can fix what breaks.
            </li>
            <li>
              <strong>Device tokens</strong> - if you enable notifications, a
              push token for your device.
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
      <div>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>
            Show you places, events and posts relevant to where you are and
            which school you attend
          </li>
          <li>Personalise recommendations based on your vibes and saved places</li>
          <li>Operate campus communities and confirm student enrolment</li>
          <li>Send notifications you have opted into</li>
          <li>Detect abuse, enforce our Terms, and respond to reports</li>
          <li>Find and fix crashes and performance problems</li>
        </ul>
        <p className="mt-4">
          We do not sell your personal information. We do not share it for
          cross-context behavioural advertising. We do not run ads.
        </p>
      </div>
    ),
  },
  {
    id: "student-verification",
    title: "4. Student Verification",
    content: (
      <div>
        <p>
          Verifying as a student is required to access campus features.
          Verification is handled by <strong>VerifyPass</strong>, a
          third-party service, which confirms your enrolment status. We
          receive the result of that check and your school, not the
          underlying documents you may provide to them.
        </p>
        <Callout>
          <strong className="text-ink">Verification confirms enrolment only.</strong>{" "}
          It is not a background check, an identity check, or a safety
          guarantee about any other user. Please read the safety guidance in
          our Terms of Use before meeting anyone.
        </Callout>
      </div>
    ),
  },
  {
    id: "location",
    title: "5. Location",
    content: (
      <div>
        <p className="mb-3">This is the part most apps are vague about, so to be specific:</p>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>
            Fynd reads your location <strong>only while the app is open</strong>.
            There is no background location tracking.
          </li>
          <li>We use it to sort places by distance and show what is near you.</li>
          <li>
            When you confirm you visited a place, we store{" "}
            <strong>the result of that check, not a history of where you have been</strong>.
            We do not build a location trail.
          </li>
          <li>
            You can deny or revoke location permission at any time in your
            device settings. The app still works; results are simply less
            relevant.
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "who-processes-your-data",
    title: "6. Who Processes Your Data",
    content: (
      <div>
        <p className="mb-4">
          Fynd relies on the following providers. Each receives only what it
          needs to do its job.
        </p>
        <div className="overflow-x-auto rounded-xl border border-hairline">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-surface text-left">
                <th className="px-4 py-3 font-semibold text-ink">Provider</th>
                <th className="px-4 py-3 font-semibold text-ink">Purpose</th>
              </tr>
            </thead>
            <tbody>
              {processors.map((p, i) => (
                <tr key={p.provider} className={i % 2 === 1 ? "bg-surface/60" : undefined}>
                  <td className="px-4 py-3 align-top font-medium text-ink whitespace-nowrap">
                    {p.provider}
                  </td>
                  <td className="px-4 py-3 align-top text-ink-muted">{p.purpose}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="mt-4">
          We may also disclose information where we are legally required to,
          or where it is necessary to protect someone&apos;s safety.
        </p>
      </div>
    ),
  },
  {
    id: "automated-ai-content",
    title: "7. Automated and AI-Generated Content",
    content: (
      <p>
        Some place descriptions in Fynd are generated by AI. They can be
        inaccurate or out of date and are not professional advice.
        Recommendations are ranked automatically based on your preferences
        and location. Automated moderation reviews content before it appears;
        it is imperfect in both directions, and you can report anything it
        misses.
      </p>
    ),
  },
  {
    id: "data-retention",
    title: "8. Data Retention",
    content: (
      <ul className="list-disc pl-5 space-y-1 text-ink-muted">
        <li>
          <strong>Account data</strong> - kept while your account is active.
        </li>
        <li>
          <strong>Usage events and notifications</strong> - periodically
          cleared as part of routine maintenance.
        </li>
        <li>
          <strong>Crash reports</strong> - retained by Sentry according to
          their standard retention period.
        </li>
        <li>
          <strong>Backups</strong> - our database provider retains backups
          for a limited period, so deleted data may persist briefly in
          backups before rotating out.
        </li>
      </ul>
    ),
  },
  {
    id: "account-deletion",
    title: "9. Account Deletion - Please Read",
    content: (
      <div>
        <p>
          You can delete your account at any time from{" "}
          <strong>Profile &rarr; Account &amp; Settings &rarr; Delete Account</strong>.
          Deletion cannot be undone.
        </p>
        <p className="mt-3">
          <strong>What is deleted:</strong> your profile, name, email,
          avatar, saved places, trips, itineraries, preferences,
          notifications and push tokens.
        </p>
        <Callout>
          <strong className="text-ink">What is not deleted:</strong> posts,
          events, replies and secrets you shared with a campus community are
          kept, with your name removed, so that conversations other students
          took part in do not vanish. If you want that content gone, delete
          it yourself before deleting your account, you can delete anything
          you created. We are telling you this plainly because it is a real
          limit on a right you would reasonably expect to be absolute.
        </Callout>
      </div>
    ),
  },
  {
    id: "your-rights",
    title: "10. Your Rights",
    content: (
      <p>
        Depending on where you live, you may have the right to access,
        correct, delete, or obtain a copy of your personal information, and
        to appeal a decision we make about such a request. To exercise any of
        these, contact{" "}
        <a href="mailto:support@fyndplaces.com" className="text-fynd hover:underline">
          support@fyndplaces.com
        </a>
        .
        <br />
        <br />
        Data export is currently handled manually. Email us and we will
        assemble your data. We would rather say that honestly than advertise
        a self-service button that does not exist.
      </p>
    ),
  },
  {
    id: "children",
    title: "11. Children's Privacy",
    content: (
      <p>
        Fynd is intended for users aged <strong>17 and over</strong>. It is
        built around user-generated content and helping students meet in
        person, which is not appropriate for younger users. We do not
        knowingly collect information from anyone under 17. If you believe a
        child has created an account, contact us and we will remove it.
      </p>
    ),
  },
  {
    id: "security",
    title: "12. Security",
    content: (
      <div>
        <ul className="list-disc pl-5 space-y-1 text-ink-muted">
          <li>All traffic is encrypted in transit using TLS.</li>
          <li>Data is encrypted at rest by our infrastructure providers.</li>
          <li>
            Database access is enforced row-by-row, so users can only read
            what they are permitted to.
          </li>
          <li>Passwords and verification codes are stored hashed, never in readable form.</li>
          <li>Sensitive operations are enforced on the server, not trusted from the app.</li>
        </ul>
        <p className="mt-4">
          We do not claim certifications we do not hold. No system is
          perfectly secure, and we cannot guarantee absolute security.
        </p>
      </div>
    ),
  },
  {
    id: "international-users",
    title: "13. International Users",
    content: (
      <p>
        Fynd is operated from the United States, and your information is
        processed there. If you use Fynd from outside the US, you are
        transferring your information to the US, where privacy laws may
        differ from those in your country.
      </p>
    ),
  },
  {
    id: "changes",
    title: "14. Changes to This Policy",
    content: (
      <p>
        We may update this policy as the app changes. Material changes will
        be announced in the app. The &quot;Last Updated&quot; date above
        always reflects the current version.
      </p>
    ),
  },
  {
    id: "contact",
    title: "15. Contact",
    content: (
      <p>
        Questions, requests, or concerns:{" "}
        <a href="mailto:support@fyndplaces.com" className="text-fynd hover:underline">
          support@fyndplaces.com
        </a>
      </p>
    ),
  },
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <div className="bg-surface pt-28 md:pt-32 pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="mono-tag text-ink-muted mb-4">Legal</p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">Privacy Policy</h1>
          <p className="text-ink-muted text-base mb-4">
            This policy describes what Fynd actually does with your
            information, not what a template says it might.
          </p>
          <p className="text-ink-muted text-sm">
            <strong>Last Updated:</strong> August 2026
          </p>
        </div>
      </div>

      {/* Body */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <Note>
          Source of truth:{" "}
          <a
            href="https://app.fyndplaces.com/privacy-policy"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fynd hover:underline"
          >
            app.fyndplaces.com/privacy-policy
          </a>
          . This page is generated from that source. If the two ever
          disagree, the hosted page wins.
        </Note>

        {/* Table of Contents */}
        <nav className="mt-8 mb-14 p-6 bg-surface rounded-2xl border border-hairline">
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
          This Privacy Policy was last updated in August 2026. See also our{" "}
          <a
            href="https://app.fyndplaces.com/terms.html"
            target="_blank"
            rel="noopener noreferrer"
            className="text-fynd hover:underline"
          >
            Terms of Use
          </a>
          .
        </p>
      </main>

      <Footer />
    </div>
  );
}
