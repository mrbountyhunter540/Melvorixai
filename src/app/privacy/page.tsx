import type { Metadata } from "next";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

export const metadata: Metadata = {
  title: "Privacy Policy — Melvorix",
};

const SECTIONS = [
  {
    title: "1. Information We Collect",
    body: "When you create an account, enroll in a course, or contact us, we collect the information you provide directly — such as your name, email address, and any message content. We also collect basic usage data (pages visited, course progress) to improve the product.",
  },
  {
    title: "2. How We Use Your Information",
    body: "We use your information to provide and improve the Academy and Studio services, process enrollments, communicate with you about your account or courses, and respond to inquiries you send us.",
  },
  {
    title: "3. Authentication & Data Storage",
    body: "Account credentials and session data are managed by Supabase, our authentication and database provider. Passwords are never stored in plain text. You can request account deletion at any time by contacting us.",
  },
  {
    title: "4. Sharing of Information",
    body: "We do not sell your personal information. We may share data with service providers who help us operate the platform (such as our hosting and authentication providers), under agreements that protect your data.",
  },
  {
    title: "5. Your Rights",
    body: "You can access, update, or delete your account information at any time from your dashboard, or by contacting us directly. You may also unsubscribe from marketing emails at any time.",
  },
  {
    title: "6. Contact",
    body: "Questions about this policy? Reach out via the Contact page or email hello@melvorix.com.",
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="melvorix-container max-w-3xl pb-24 pt-40 sm:pt-48">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
          Legal
        </span>

        <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em]">
          Privacy Policy
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
