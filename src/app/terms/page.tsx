import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Terms of Service — Melvorix",
};

const SECTIONS = [
  {
    title: "1. Acceptance of Terms",
    body: "By creating an account or using Melvorix's Academy or Studio services, you agree to these Terms of Service. If you don't agree, please don't use the platform.",
  },
  {
    title: "2. Course Access",
    body: "Enrolling in a course grants you a personal, non-transferable license to access that course's content. Enrollment fees are as listed at the time of purchase; access does not include the right to redistribute or resell course materials.",
  },
  {
    title: "3. Account Responsibilities",
    body: "You're responsible for maintaining the confidentiality of your account credentials and for all activity under your account. Notify us immediately of any unauthorized use.",
  },
  {
    title: "4. Studio Engagements",
    body: "Custom software or automation work delivered through the Melvorix Studio is governed by a separate written agreement scoped to that engagement, in addition to these general terms.",
  },
  {
    title: "5. Refunds",
    body: "Course purchases may be refunded within 14 days of enrollment if less than 20% of the course has been completed. Contact us to request a refund.",
  },
  {
    title: "6. Changes to These Terms",
    body: "We may update these terms from time to time. Continued use of the platform after changes take effect constitutes acceptance of the updated terms.",
  },
  {
    title: "7. Contact",
    body: "Questions about these terms? Reach out via the Contact page or email hello@melvorix.com.",
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="melvorix-container max-w-3xl pb-24 pt-40 sm:pt-48">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
          Legal
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em]">
          Terms of Service
        </h1>

        <p className="mt-4 text-sm text-slate-500">
          Last updated: {new Date().toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>

        <div className="mt-10 space-y-8">
          {SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="font-display text-lg font-semibold text-white">
                {section.title}
              </h2>
              <p className="mt-2 text-sm leading-7 text-slate-400">
                {section.body}
              </p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
