
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock,
  Users,
} from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { siteConfig } from "@/config/site";

type Props = {
  params: Promise<{ slug: string }>;
};

function getCourse(slug: string) {
  return siteConfig.courses.find((c) => c.id === slug);
}

export async function generateStaticParams() {
  return siteConfig.courses.map((course) => ({ slug: course.id }));
}

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    return {
      title: "Course not found — Melvorix",
    };
  }

  return {
    title: `${course.title} — Melvorix Academy`,
    description: course.description,
  };
}

// Generic learning outcomes shown for every track until you wire up
// real per-course syllabus data.
const OUTCOMES = [
  "Hands-on projects you can add straight to your portfolio",
  "1:1 mentorship from practicing engineers",
  "Certificate of completion",
  "Lifetime access, including future updates to the material",
];

export default async function CourseDetailPage({ params }: Props) {
  const { slug } = await params;
  const course = getCourse(slug);

  if (!course) {
    notFound();
  }

  /*
   * Public enrollment flow:
   *
   * Course Details
   *      ↓
   * Enroll Now
   *      ↓
   * Public Enrollment Form
   *      ↓
   * Submit Application
   *
   * No login or registration is required.
   */
  const enrollHref = `/courses/${course.id}/enroll`;

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="relative overflow-hidden pb-16 pt-40 sm:pt-48">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_75%_10%,rgba(99,102,241,0.12),transparent_45%)]" />

        <div className="melvorix-container relative">
          <Link
            href="/courses"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 transition hover:text-slate-300"
          >
            &larr; All Courses
          </Link>

          <div className="mt-6 grid gap-12 lg:grid-cols-[1.4fr_1fr]">
            {/* MAIN */}

            <div>
              <span
                className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                  course.accent === "cyan"
                    ? "bg-cyan-400/10 text-cyan-300"
                    : "bg-indigo-400/10 text-indigo-300"
                }`}
              >
                {course.number} / {course.category}
              </span>

              <h1 className="mt-5 font-display text-4xl font-bold uppercase tracking-tight sm:text-5xl">
                {course.title}
              </h1>

              <p className="mt-5 max-w-xl text-base leading-8 text-slate-400">
                {course.description}
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-6 text-sm text-slate-400">
                <span className="flex items-center gap-2">
                  <BookOpen size={16} className="text-indigo-400" />
                  {course.modules}
                </span>

                <span className="flex items-center gap-2">
                  <Clock size={16} className="text-indigo-400" />
                  {course.lessons}
                </span>

                <span className="flex items-center gap-2">
                  <Users size={16} className="text-indigo-400" />
                  Cohort + self-paced
                </span>

                <span className="flex items-center gap-2">
                  <Award size={16} className="text-indigo-400" />
                  Certificate included
                </span>
              </div>

              <div className="mt-12">
                <h2 className="font-display text-xl font-semibold text-white">
                  What you&apos;ll get
                </h2>

                <ul className="mt-5 space-y-3">
                  {OUTCOMES.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-3 text-sm leading-6 text-slate-300"
                    >
                      <CheckCircle2
                        size={17}
                        className="mt-0.5 shrink-0 text-indigo-400"
                      />

                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* STICKY ENROLL CARD */}

            <div className="lg:sticky lg:top-28 lg:self-start">
              <div className="melvorix-glass rounded-3xl p-7">
                <div className="flex items-center gap-3">
                  <span className="font-display text-3xl font-bold text-white">
                    {course.price}
                  </span>

                  <span className="text-sm text-slate-500 line-through">
                    {course.oldPrice}
                  </span>

                  <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                    {course.discount}
                  </span>
                </div>

                <Link
                  href={enrollHref}
                  className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
                >
                  Enroll Now
                  <ArrowRight size={16} />
                </Link>

                <p className="mt-3 text-center text-xs text-slate-500">
                  No account or registration required.
                </p>

                <div className="mt-6 space-y-3 border-t border-white/[0.06] pt-6">
                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <BookOpen size={15} className="text-indigo-400" />
                    {course.modules}
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Clock size={15} className="text-indigo-400" />
                    {course.lessons}
                  </div>

                  <div className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Award size={15} className="text-indigo-400" />
                    Certificate of Completion
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

