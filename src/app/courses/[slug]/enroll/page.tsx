
import { notFound } from "next/navigation";
import Link from "next/link";

import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import EnrollmentForm from "@/components/courses/enrollment-form";
import { siteConfig } from "@/config/site";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CourseEnrollmentPage({
  params,
}: PageProps) {
  const { slug } = await params;

  const course = siteConfig.courses.find(
    (item) => item.id === slug
  );

  if (!course) {
    notFound();
  }

  /*
   * Keep these values explicitly typed as strings.
   * This prevents TypeScript from treating values from the
   * readonly course configuration as unknown React nodes.
   */
  const courseTitle = String(course.title);
  const courseCategory = String(course.category);
  const courseDescription = String(course.description);
  const courseId = String(course.id);
  const courseModules = String(course.modules);
  const courseLessons = String(course.lessons);
  const coursePrice = String(course.price);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ====================================================== */}
        <section className="relative overflow-hidden border-b border-border">
          <div className="absolute inset-0 -z-10">
            <div className="absolute left-1/2 top-0 h-[420px] w-[700px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

            <div className="absolute right-0 top-1/3 h-[300px] w-[300px] rounded-full bg-primary/5 blur-[100px]" />
          </div>

          <div className="mx-auto max-w-7xl px-4 pb-16 pt-28 sm:px-6 lg:px-8 lg:pb-20 lg:pt-36">
            <div className="mx-auto max-w-3xl text-center">
              <Link
                href={`/courses/${courseId}`}
                className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted-foreground transition hover:text-foreground"
              >
                <svg
                  className="h-4 w-4"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 18l-6-6 6-6"
                  />
                </svg>

                Back to course
              </Link>

              <div className="mb-5 inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                Enrollment
              </div>

              <h1 className="text-4xl font-black tracking-tight sm:text-5xl lg:text-6xl">
                Start your journey with{" "}
                <span className="text-primary">
                  {courseTitle}
                </span>
              </h1>

              <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                Complete the short enrollment form below.
                No account or registration is required.
              </p>
            </div>
          </div>
        </section>

        {/* =====================================================
            MAIN ENROLLMENT AREA
        ====================================================== */}
        <section className="py-12 sm:py-16 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8">

            {/* =================================================
                COURSE SUMMARY
            ================================================== */}
            <aside className="h-fit lg:sticky lg:top-28">
              <div className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">

                {/* Course Header */}
                <div className="relative overflow-hidden bg-muted/50 p-7 sm:p-8">
                  <div className="absolute right-[-40px] top-[-40px] h-40 w-40 rounded-full bg-primary/10 blur-3xl" />

                  <div className="relative">
                    <div className="mb-4 inline-flex rounded-xl bg-primary/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-primary">
                      {courseCategory}
                    </div>

                    <h2 className="text-2xl font-bold tracking-tight">
                      {courseTitle}
                    </h2>

                    {courseDescription && (
                      <p className="mt-4 text-sm leading-7 text-muted-foreground">
                        {courseDescription}
                      </p>
                    )}
                  </div>
                </div>

                <div className="space-y-6 p-7 sm:p-8">

                  {/* ===========================================
                      COURSE DETAILS
                  ============================================ */}
                  <div className="grid grid-cols-2 gap-4">

                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Modules
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {courseModules}
                      </p>
                    </div>

                    <div className="rounded-2xl border border-border p-4">
                      <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                        Lessons
                      </p>

                      <p className="mt-1 text-sm font-semibold">
                        {courseLessons}
                      </p>
                    </div>

                  </div>

                  {/* ===========================================
                      PRICE
                  ============================================ */}
                  <div className="rounded-2xl border border-primary/20 bg-primary/5 p-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                      Course investment
                    </p>

                    <div className="mt-2 flex items-end gap-2">
                      <span className="text-3xl font-black tracking-tight">
                        {coursePrice}
                      </span>
                    </div>
                  </div>

                  {/* ===========================================
                      WHAT YOU'LL GET
                  ============================================ */}
                  <div>
                    <h3 className="text-sm font-bold">
                      What you&apos;ll get
                    </h3>

                    <div className="mt-4 space-y-3">

                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        </span>

                        <span className="text-sm text-muted-foreground">
                          Structured learning experience
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        </span>

                        <span className="text-sm text-muted-foreground">
                          Practical projects and resources
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        </span>

                        <span className="text-sm text-muted-foreground">
                          Career-focused learning
                        </span>
                      </div>

                      <div className="flex items-start gap-3">
                        <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <svg
                            className="h-3 w-3"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="3"
                            aria-hidden="true"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="m5 12 4 4L19 6"
                            />
                          </svg>
                        </span>

                        <span className="text-sm text-muted-foreground">
                          Certificate upon completion
                        </span>
                      </div>

                    </div>
                  </div>

                  {/* ===========================================
                      PROCESS
                  ============================================ */}
                  <div className="rounded-2xl bg-muted/50 p-5">
                    <p className="text-xs font-bold uppercase tracking-wider">
                      How it works
                    </p>

                    <div className="mt-4 space-y-4">

                      {/* Step 1 */}
                      <div className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          1
                        </span>

                        <div>
                          <p className="text-sm font-semibold">
                            Submit your details
                          </p>

                          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                            Complete the enrollment form.
                          </p>
                        </div>
                      </div>

                      {/* Step 2 */}
                      <div className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          2
                        </span>

                        <div>
                          <p className="text-sm font-semibold">
                            Our team reviews
                          </p>

                          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                            We&apos;ll review your information.
                          </p>
                        </div>
                      </div>

                      {/* Step 3 */}
                      <div className="flex gap-3">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                          3
                        </span>

                        <div>
                          <p className="text-sm font-semibold">
                            Get the next steps
                          </p>

                          <p className="mt-0.5 text-xs leading-5 text-muted-foreground">
                            We&apos;ll contact you directly.
                          </p>
                        </div>
                      </div>

                    </div>
                  </div>

                </div>
              </div>
            </aside>

            {/* =================================================
                ENROLLMENT FORM
            ================================================== */}
            <div>
              <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-8 lg:p-10">

                <div className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
                    Apply now
                  </p>

                  <h2 className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
                    Enrollment Form
                  </h2>

                  <p className="mt-2 text-sm leading-6 text-muted-foreground">
                    Please provide accurate information so our
                    team can guide you properly.
                  </p>
                </div>

                <EnrollmentForm
                  courseSlug={courseId}
                  courseName={courseTitle}
                />

              </div>
            </div>

          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}

