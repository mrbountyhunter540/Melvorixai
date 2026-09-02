"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { AlertCircle, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

import { createClient } from "@/lib/supabase/client";

export function EnrollConfirmButton({
  courseId,
  courseTitle,
}: {
  courseId: string;
  courseTitle: string;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  async function handleEnroll() {
    setLoading(true);
    setError(null);
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push(
        `/login?redirect=${encodeURIComponent(`/courses/${courseId}/enroll`)}`
      );
      return;
    }

    const { error: insertError } = await supabase.from("enrollments").insert({
      user_id: user.id,
      course_id: courseId,
    });

    setLoading(false);

    if (insertError) {
      // Most likely cause: the `enrollments` table hasn't been created
      // yet. See supabase/schema.sql in the project root.
      if (insertError.code === "23505") {
        // unique violation — already enrolled, treat as success
        setDone(true);
        return;
      }
      setError(
        insertError.message.includes("does not exist")
          ? "Enrollments table isn't set up yet. Run supabase/schema.sql in your Supabase SQL Editor, then try again."
          : insertError.message
      );
      return;
    }

    setDone(true);
  }

  if (done) {
    return (
      <div className="space-y-4">
        <div className="flex items-start gap-3 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] p-4 text-sm text-emerald-300">
          <CheckCircle2 size={18} className="mt-0.5 shrink-0" />
          <span>
            You&apos;re enrolled in <strong>{courseTitle}</strong>.
          </span>
        </div>

        <button
          type="button"
          onClick={() => router.push("/dashboard")}
          className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
        >
          Go to Dashboard
          <ArrowRight size={16} />
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {error && (
        <div className="flex items-start gap-2 rounded-xl border border-red-400/20 bg-red-400/[0.06] p-3 text-sm text-red-300">
          <AlertCircle size={16} className="mt-0.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <button
        type="button"
        onClick={handleEnroll}
        disabled={loading}
        className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-indigo-500 text-sm font-semibold text-white shadow-[0_0_30px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <>
            Confirm Enrollment
            <ArrowRight size={16} />
          </>
        )}
      </button>
    </div>
  );
}
