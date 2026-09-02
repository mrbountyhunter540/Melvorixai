import Link from "next/link";
import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { ArrowRight, BookOpen, LayoutGrid } from "lucide-react";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { siteConfig } from "@/config/site";
import { createClient } from "@/lib/supabase/server";

export const metadata: Metadata = {
  title: "Dashboard — Melvorix",
};

export default async function DashboardPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login?redirect=/dashboard");

  // Gracefully handle the case where supabase/schema.sql hasn't been
  // run yet — the query below will error if the table is missing.
  let enrolledCourseIds: string[] = [];
  const { data: enrollments } = await supabase
    .from("enrollments")
    .select("course_id")
    .eq("user_id", user.id);

  if (enrollments) {
    enrolledCourseIds = enrollments.map((e) => e.course_id as string);
  }

  const enrolledCourses = siteConfig.courses.filter((c) =>
    enrolledCourseIds.includes(c.id)
  );

  const displayName =
    (user.user_metadata?.full_name as string | undefined) ||
    user.email?.split("@")[0] ||
    "there";

  return (
    <main className="min-h-screen bg-[#0B0F19] text-white">
      <Navbar />

      <section className="melvorix-container pt-32 pb-24">
        <div className="flex flex-col items-start justify-between gap-4 border-b border-white/[0.06] pb-8 sm:flex-row sm:items-end">
          <div>
            <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
              Dashboard
            </span>
            <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] sm:text-4xl">
              Welcome back, {displayName}.
            </h1>
          </div>

          <SignOutButton />
        </div>

        <div className="mt-10">
          <div className="flex items-center gap-2.5">
            <LayoutGrid size={18} className="text-indigo-400" />
            <h2 className="font-display text-lg font-semibold text-white">
              My Courses
            </h2>
          </div>

          {enrolledCourses.length === 0 ? (
            <div className="mt-6 rounded-3xl border border-dashed border-white/[0.1] bg-white/[0.015] p-10 text-center">
              <p className="text-sm text-slate-400">
                You haven&apos;t enrolled in any courses yet.
              </p>
              <Link
                href="/courses"
                className="mt-5 inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-5 text-sm font-semibold text-white transition hover:bg-indigo-400"
              >
                Browse Courses
                <ArrowRight size={15} />
              </Link>
            </div>
          ) : (
            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {enrolledCourses.map((course) => (
                <div
                  key={course.id}
                  className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-6"
                >
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] ${
                      course.accent === "cyan"
                        ? "bg-cyan-400/10 text-cyan-300"
                        : "bg-indigo-400/10 text-indigo-300"
                    }`}
                  >
                    {course.category}
                  </span>

                  <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-tight text-white">
                    {course.title}
                  </h3>

                  <p className="mt-2 flex items-center gap-2 text-xs text-slate-500">
                    <BookOpen size={13} className="text-indigo-400" />
                    {course.modules}
                  </p>

                  <Link
                    href={`/courses/${course.id}`}
                    className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
                  >
                    Continue
                    <ArrowRight size={14} />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
