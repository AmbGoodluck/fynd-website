import type { Metadata } from "next";
import { Mail, MessageCircle, ShieldCheck } from "lucide-react";
import { Footer } from "@/components/sections/Footer";
import { SupportFaq } from "@/components/support/SupportFaq";
import { SupportForm } from "@/components/support/SupportForm";

export const metadata: Metadata = {
  title: "Support | Fynd",
  description:
    "Get help with Fynd - browse FAQs, contact our support team, or send feedback and bug reports directly to the team.",
};

const contactCards = [
  {
    icon: Mail,
    title: "Email us",
    body: "The fastest way to reach a human.",
    action: {
      label: "support@fyndplaces.com",
      href: "mailto:support@fyndplaces.com",
    },
  },
  {
    icon: MessageCircle,
    title: "Send feedback",
    body: "Report a bug, request a feature, or just say hi.",
    action: { label: "Use the form below", href: "#contact-form" },
  },
  {
    icon: ShieldCheck,
    title: "Privacy & data",
    body: "Questions about your data or account deletion.",
    action: { label: "privacy@fyndplaces.com", href: "mailto:privacy@fyndplaces.com" },
  },
];

export default function SupportPage() {
  return (
    <div className="min-h-screen bg-canvas">
      {/* Hero */}
      <div className="bg-surface pt-28 md:pt-32 pb-14 md:pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <p className="mono-tag text-ink-muted mb-4">Help center</p>
          <h1 className="text-4xl md:text-5xl text-ink mb-4">Support</h1>
          <p className="text-ink-muted text-base md:text-lg max-w-2xl">
            Questions, bug reports, or feedback about Fynd - we&apos;re here
            to help. Browse the FAQ below or reach out directly.
          </p>
        </div>
      </div>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Contact cards */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {contactCards.map(({ icon: Icon, title, body, action }) => (
            <div
              key={title}
              className="rounded-2xl border border-hairline bg-surface-raised p-5"
            >
              <div className="w-10 h-10 rounded-full bg-fynd/10 flex items-center justify-center mb-3">
                <Icon className="w-5 h-5 text-fynd" />
              </div>
              <h3 className="font-semibold text-ink text-sm mb-1">{title}</h3>
              <p className="text-ink-muted text-xs mb-3 leading-relaxed">{body}</p>
              <a href={action.href} className="text-fynd text-sm font-medium hover:underline">
                {action.label}
              </a>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <section className="mb-16">
          <h2 className="text-2xl text-ink mb-2">Frequently asked questions</h2>
          <p className="text-ink-muted text-sm mb-8">
            Can&apos;t find what you&apos;re looking for? Send us a message
            below.
          </p>
          <SupportFaq />
        </section>

        {/* Contact form */}
        <section id="contact-form" className="scroll-mt-24">
          <h2 className="text-2xl text-ink mb-2">Still need help?</h2>
          <p className="text-ink-muted text-sm mb-8">
            Fill out the form and our team will get back to you at the email
            you provide.
          </p>
          <SupportForm />
        </section>

        {/* Legal links */}
        <p className="mt-16 pt-8 border-t border-hairline text-sm text-ink-muted text-center">
          See our{" "}
          <a href="/privacy" className="text-fynd hover:underline">
            Privacy Policy
          </a>{" "}
          and{" "}
          <a href="/terms-of-service" className="text-fynd hover:underline">
            Terms of Service
          </a>{" "}
          for more information.
        </p>
      </main>

      <Footer />
    </div>
  );
}
