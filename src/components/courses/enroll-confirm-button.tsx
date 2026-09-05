
"use client";

import { useRouter } from "next/navigation";
import { ArrowRight } from "lucide-react";

export function EnrollConfirmButton({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) {
  const router = useRouter();

  function handleEnroll() {
    router.push(`/courses/${courseId}/enroll`);
  }

  return (
    <div className="space-y-4">
      <div className="rounded-xl border border-indigo-400/20 bg-indigo-400/[0.06] p-4 text-sm text-slate-300">
        <p>
          Ready to enroll in{" "}
          <strong className="text-white">{courseTitle}</strong>?
        </p>

        <p className="mt-1 text-xs leading-5 text-slate-500">
          No account or registration is required. Continue to the enrollment
          form to submit your details.
        </p>
      </div>

      <button
        type="button"
        onClick={handleEnroll}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
      >
        Continue to Enrollment
        <ArrowRight size={16} />
      </button>
    </div>
  );
}

