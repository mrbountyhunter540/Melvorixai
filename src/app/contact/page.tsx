import type { Metadata } from "next";
import { Mail, MapPin } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ContactForm } from "@/components/contact/contact-form";

export const metadata: Metadata = {
  title: "Contact — Melvorix",
  description: "Get in touch with the Melvorix Academy and Studio team.",
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="relative overflow-hidden pb-24 pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(99,102,241,0.1),transparent_45%)]" />

        <div className="melvorix-container relative grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
              Get In Touch
            </span>

            <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Let&apos;s talk.
            </h1>

            <p className="mt-5 max-w-sm text-base leading-8 text-slate-400">
              Questions about a course, or want to scope a studio project?
              Send us a message and we&apos;ll reply within 1–2 business
              days.
            </p>

            <div className="mt-8 space-y-4">
              <a
                href="mailto:hello@melvorix.com"
                className="flex items-center gap-3 text-sm text-slate-300 transition hover:text-white"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-400/[0.06]">
                  <Mail size={16} className="text-indigo-400" />
                </span>
                hello@melvorix.com
              </a>

              <div className="flex items-center gap-3 text-sm text-slate-300">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/15 bg-indigo-400/[0.06]">
                  <MapPin size={16} className="text-indigo-400" />
                </span>
                Remote-first team
              </div>
            </div>
          </div>

          <div className="melvorix-glass rounded-3xl p-7 sm:p-9">
            <ContactForm />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
