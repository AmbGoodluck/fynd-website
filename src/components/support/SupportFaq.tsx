"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    question: "What is Fynd?",
    answer: (
      <p>
        Fynd is a campus discovery and social app for verified students. It
        helps you find places around your school, share recommendations,
        post events, and see what other students at your campus are talking
        about.
      </p>
    ),
  },
  {
    question: "Is Fynd free to use?",
    answer: (
      <p>
        Yes. Fynd is currently an independent student software project - it
        isn&apos;t operated by a registered company, and it charges nothing.
      </p>
    ),
  },
  {
    question: "Do I need to verify as a student to use Fynd?",
    answer: (
      <p>
        Verifying as a student is required for campus features - posting,
        browsing student content, and seeing who else is on your campus.
        Verification is handled by a third-party service and confirms your
        enrolment only; it isn&apos;t a background or identity check. See our{" "}
        <a href="/privacy" className="text-fynd hover:underline">
          Privacy Policy
        </a>{" "}
        for details.
      </p>
    ),
  },
  {
    question: "Which platforms is Fynd available on?",
    answer: (
      <p>
        Fynd is available as a web app at{" "}
        <a
          href="https://app.fyndplaces.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-fynd hover:underline"
        >
          app.fyndplaces.com
        </a>
        , with native iOS and Android apps rolling out to waitlisted users.
        Visit the{" "}
        <a href="/install" className="text-fynd hover:underline">
          install page
        </a>{" "}
        for the latest availability.
      </p>
    ),
  },
  {
    question: "How do I report a bug or request a feature?",
    answer: (
      <p>
        Use the form below and choose &quot;Bug report&quot; or
        &quot;Feature request&quot; as the category. Include your device
        and app version if you can - it helps us reproduce issues faster.
      </p>
    ),
  },
  {
    question: "How do I delete my account and my data?",
    answer: (
      <p>
        Open the Fynd app and go to{" "}
        <strong>Profile &rarr; Account &amp; Settings &rarr; Delete Account</strong>.
        This permanently removes your profile, saved places, trips and
        preferences. Posts, events, and replies you shared with a campus
        community are kept with your name removed, so conversations other
        students took part in don&apos;t vanish - delete those yourself first
        if you want them gone too. If you can&apos;t access the app, email{" "}
        <a
          href="mailto:support@fyndplaces.com"
          className="text-fynd hover:underline"
        >
          support@fyndplaces.com
        </a>{" "}
        from your account&apos;s email address and we&apos;ll delete it for
        you. See our{" "}
        <a href="/privacy" className="text-fynd hover:underline">
          Privacy Policy
        </a>{" "}
        for details.
      </p>
    ),
  },
  {
    question: "Why does Fynd ask for my location?",
    answer: (
      <p>
        Location access lets Fynd suggest places near you and show accurate
        distances. It&apos;s only used while you&apos;re using the app, and
        you can revoke it anytime in your device settings - Fynd will still
        work with manual location search.
      </p>
    ),
  },
  {
    question: "Is there an age requirement?",
    answer: (
      <p>
        Yes - Fynd is intended for users aged 17 and over. It&apos;s built
        around user-generated content and helping students meet in person,
        which isn&apos;t appropriate for younger users.
      </p>
    ),
  },
  {
    question: "How quickly will I hear back from support?",
    answer: (
      <p>
        We typically reply within 1-2 business days. For account issues,
        please include the email address associated with your account.
      </p>
    ),
  },
];

export const SupportFaq = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={faq.question}
            className="rounded-2xl border border-hairline bg-surface-raised overflow-hidden"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="w-full flex items-center justify-between gap-4 text-left px-5 py-4 sm:px-6 sm:py-5"
            >
              <span className="font-medium text-ink">{faq.question}</span>
              <ChevronDown
                className={`w-5 h-5 flex-shrink-0 text-ink-muted transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            {isOpen && (
              <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-ink-muted leading-relaxed text-sm">
                {faq.answer}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
