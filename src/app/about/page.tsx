import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "About — Melvorix",
  description: siteConfig.description,
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="relative overflow-hidden pb-20 pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_45%)]" />

        <div className="melvorix-container relative max-w-3xl">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            About Melvorix
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            A tech academy and software studio, under one roof.
          </h1>

          <p className="mt-6 text-base leading-8 text-slate-400">
            {siteConfig.description} We started Melvorix because most
            technical education stops at theory — we wanted something
            different: courses taught by people who actually ship software,
            and a studio that builds the same kind of real, production-grade
            work our students learn to do.
          </p>

          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="font-display text-lg font-semibold text-white">
                The Academy
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                Industry-focused tracks in AI Automation, Cybersecurity, Data
                & Analytics and Digital Automation — built around real
                projects, not passive video lectures.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6">
              <h2 className="font-display text-lg font-semibold text-white">
                The Studio
              </h2>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                A software studio building AI systems, custom software and
                automation for businesses — the same skills we teach, applied
                to real client work.
              </p>
            </div>
          </div>

          <div className="mt-12 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/courses"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
            >
              Explore Courses
              <ArrowRight size={16} />
            </Link>

            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.06]"
            >
              Get In Touch
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
