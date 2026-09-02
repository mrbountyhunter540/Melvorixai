import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, Clock } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = {
  title: "Courses — Melvorix Academy",
  description:
    "Industry-focused courses in AI Automation, Cybersecurity, Data & Analytics and Digital Automation.",
};

export default function CoursesPage() {
  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="relative overflow-hidden pt-40 pb-16 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.12),transparent_45%)]" />

        <div className="melvorix-container relative text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-indigo-400">
            Melvorix Academy
          </span>

          <h1 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
            Every course, one place.
          </h1>

          <p className="mx-auto mt-5 max-w-xl text-base leading-8 text-slate-400">
            No outdated theory. No endless lectures. Pick a track and start
            building real projects today.
          </p>
        </div>
      </section>

      <section className="pb-28">
        <div className="melvorix-container grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
          {siteConfig.courses.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="group relative overflow-hidden rounded-3xl border border-white/[0.08] bg-white/[0.02] p-8 transition-all hover:-translate-y-1 hover:border-indigo-400/25 hover:bg-white/[0.04]"
            >
              <div
                className={`absolute -right-16 -top-16 h-56 w-56 rounded-full blur-[100px] transition-opacity group-hover:opacity-100 ${
                  course.accent === "cyan"
                    ? "bg-cyan-400/10"
                    : "bg-indigo-400/10"
                } opacity-60`}
              />

              <div className="relative">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                    course.accent === "cyan"
                      ? "bg-cyan-400/10 text-cyan-300"
                      : "bg-indigo-400/10 text-indigo-300"
                  }`}
                >
                  {course.number} / {course.category}
                </span>

                <h2 className="mt-5 font-display text-2xl font-bold uppercase tracking-tight text-white">
                  {course.title}
                </h2>

                <p className="mt-3 max-w-md text-sm leading-6 text-slate-400">
                  {course.description}
                </p>

                <div className="mt-6 flex items-center gap-5 text-xs text-slate-500">
                  <span className="flex items-center gap-1.5">
                    <BookOpen size={13} className="text-indigo-400" />
                    {course.modules}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock size={13} className="text-indigo-400" />
                    {course.lessons}
                  </span>
                </div>

                <div className="mt-7 flex items-center justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="font-display text-xl font-bold text-white">
                      {course.price}
                    </span>
                    <span className="text-sm text-slate-500 line-through">
                      {course.oldPrice}
                    </span>
                  </div>

                  <span className="flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition group-hover:gap-2.5 group-hover:text-indigo-300">
                    View Course
                    <ArrowRight size={15} />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <Footer />
    </main>
  );
}
