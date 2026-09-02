import { notFound, redirect } from "next/navigation";
import type { Metadata } from "next";
import { Award, BookOpen, Clock } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { EnrollConfirmButton } from "@/components/courses/enroll-confirm-button";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

type Props = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  title: "Confirm Enrollment — Melvorix",
};

export default async function EnrollPage({ params }: Props) {
  const { slug } = await params;
  const course = siteConfig.courses.find((c) => c.id === slug);

  if (!course) notFound();

  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect(`/login?redirect=${encodeURIComponent(`/courses/${slug}/enroll`)}`);
  }

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="melvorix-container flex min-h-screen items-center pt-32 pb-20">
        <div className="mx-auto w-full max-w-md">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            Confirm Enrollment
          </span>

          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em]">
            One step from starting.
          </h1>

          <div className="melvorix-glass mt-8 rounded-3xl p-7">
            <span
              className={`inline-flex items-center rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] ${
                course.accent === "cyan"
                  ? "bg-cyan-400/10 text-cyan-300"
                  : "bg-indigo-400/10 text-indigo-300"
              }`}
            >
              {course.number} / {course.category}
            </span>

            <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight text-white">
              {course.title}
            </h2>

            <p className="mt-3 text-sm leading-6 text-slate-400">
              {course.description}
            </p>

            <div className="mt-6 space-y-3 border-y border-white/[0.06] py-6">
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

            <div className="mt-6 flex items-center gap-3">
              <span className="font-display text-2xl font-bold text-white">
                {course.price}
              </span>
              <span className="text-sm text-slate-500 line-through">
                {course.oldPrice}
              </span>
              <span className="rounded-full bg-emerald-400/10 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                {course.discount}
              </span>
            </div>

            <p className="mt-2 text-xs text-slate-600">
              Signed in as {user.email}
            </p>

            <div className="mt-6">
              <EnrollConfirmButton
                courseId={course.id}
                courseTitle={course.title}
              />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
