"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";

type EnrollmentFormProps = {
  courseSlug: string;
  courseName: string;
};

type FormState = {
  fullName: string;
  email: string;
  phone: string;
  education: string;
  skillLevel: string;
  learningGoal: string;
  learningMode: string;
  message: string;
  termsAccepted: boolean;
  website: string;
};

const initialForm: FormState = {
  fullName: "",
  email: "",
  phone: "",
  education: "",
  skillLevel: "",
  learningGoal: "",
  learningMode: "",
  message: "",
  termsAccepted: false,
  website: "",
};

export default function EnrollmentForm({
  courseSlug,
  courseName,
}: EnrollmentFormProps) {
  const [form, setForm] = useState<FormState>(initialForm);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  function updateField(
    field: keyof FormState,
    value: string | boolean
  ) {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setError("");
    setSuccess(false);

    if (!form.termsAccepted) {
      setError(
        "Please accept the terms and conditions before submitting."
      );
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/enrollments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          courseSlug,
          fullName: form.fullName,
          email: form.email,
          phone: form.phone,
          education: form.education,
          skillLevel: form.skillLevel,
          learningGoal: form.learningGoal,
          learningMode: form.learningMode,
          message: form.message,
          termsAccepted: form.termsAccepted,
          website: form.website,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(
          data.message ||
            "Something went wrong. Please try again."
        );
      }

      setSuccess(true);
      setForm(initialForm);
    } catch (submitError) {
      console.error("Enrollment submission error:", submitError);

      setError(
        submitError instanceof Error
          ? submitError.message
          : "Something went wrong. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-3xl border border-emerald-500/20 bg-emerald-500/5 p-8 text-center sm:p-12">
        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10">
          <svg
            className="h-8 w-8 text-emerald-500"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m5 12 4 4L19 6"
            />
          </svg>
        </div>

        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
          Enrollment request received!
        </h2>

        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
          Thank you for your interest in{" "}
          <strong>{courseName}</strong>. Your enrollment
          request has been successfully submitted.
        </p>

        <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-muted-foreground">
          We&apos;ll review your information and contact you
          with the next steps. A confirmation email has also
          been sent to your email address.
        </p>

        <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
          <button
            type="button"
            onClick={() => {
              setSuccess(false);
              setForm(initialForm);
            }}
            className="rounded-xl border border-border px-6 py-3 text-sm font-semibold transition hover:bg-muted"
          >
            Submit another request
          </button>

          <Link
            href="/courses"
            className="rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
          >
            Explore other courses
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Basic Information */}
      <div className="space-y-6">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Personal Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Tell us a little about yourself.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="fullName"
              className="text-sm font-medium"
            >
              Full Name <span className="text-red-500">*</span>
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              autoComplete="name"
              required
              minLength={2}
              value={form.fullName}
              onChange={(event) =>
                updateField("fullName", event.target.value)
              }
              placeholder="Enter your full name"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="email"
              className="text-sm font-medium"
            >
              Email Address <span className="text-red-500">*</span>
            </label>

            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={form.email}
              onChange={(event) =>
                updateField("email", event.target.value)
              }
              placeholder="you@example.com"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="phone"
              className="text-sm font-medium"
            >
              Phone / WhatsApp <span className="text-red-500">*</span>
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              autoComplete="tel"
              required
              value={form.phone}
              onChange={(event) =>
                updateField("phone", event.target.value)
              }
              placeholder="+92 300 1234567"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="education"
              className="text-sm font-medium"
            >
              Education / Background{" "}
              <span className="text-red-500">*</span>
            </label>

            <input
              id="education"
              name="education"
              type="text"
              required
              value={form.education}
              onChange={(event) =>
                updateField("education", event.target.value)
              }
              placeholder="e.g. Intermediate, Bachelor's, Freelancer"
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </div>

      {/* Learning Information */}
      <div className="space-y-6 border-t border-border pt-8">
        <div>
          <h2 className="text-xl font-bold tracking-tight">
            Learning Information
          </h2>

          <p className="mt-1 text-sm text-muted-foreground">
            Help us understand where you are and what you
            want to achieve.
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div className="space-y-2">
            <label
              htmlFor="skillLevel"
              className="text-sm font-medium"
            >
              Current Skill Level
            </label>

            <select
              id="skillLevel"
              name="skillLevel"
              value={form.skillLevel}
              onChange={(event) =>
                updateField("skillLevel", event.target.value)
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select your level</option>
              <option value="Beginner">Beginner</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Advanced">Advanced</option>
              <option value="Professional">Professional</option>
            </select>
          </div>

          <div className="space-y-2">
            <label
              htmlFor="learningMode"
              className="text-sm font-medium"
            >
              Preferred Learning Mode
            </label>

            <select
              id="learningMode"
              name="learningMode"
              value={form.learningMode}
              onChange={(event) =>
                updateField("learningMode", event.target.value)
              }
              className="h-12 w-full rounded-xl border border-border bg-background px-4 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            >
              <option value="">Select learning mode</option>
              <option value="Self-paced">Self-paced</option>
              <option value="Cohort + mentoring">
                Cohort + mentoring
              </option>
              <option value="Not sure yet">
                Not sure yet
              </option>
            </select>
          </div>
        </div>

        <div className="space-y-2">
          <label
            htmlFor="learningGoal"
            className="text-sm font-medium"
          >
            What do you want to achieve?{" "}
            <span className="text-red-500">*</span>
          </label>

          <textarea
            id="learningGoal"
            name="learningGoal"
            required
            rows={4}
            value={form.learningGoal}
            onChange={(event) =>
              updateField("learningGoal", event.target.value)
            }
            placeholder="Tell us what you want to learn, build, or achieve through this course..."
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>

        <div className="space-y-2">
          <label
            htmlFor="message"
            className="text-sm font-medium"
          >
            Additional Message{" "}
            <span className="font-normal text-muted-foreground">
              (Optional)
            </span>
          </label>

          <textarea
            id="message"
            name="message"
            rows={4}
            value={form.message}
            onChange={(event) =>
              updateField("message", event.target.value)
            }
            placeholder="Anything else you'd like our team to know?"
            className="w-full resize-none rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      </div>

      {/* Terms */}
      <div className="border-t border-border pt-8">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            name="termsAccepted"
            checked={form.termsAccepted}
            onChange={(event) =>
              updateField(
                "termsAccepted",
                event.target.checked
              )
            }
            className="mt-1 h-4 w-4 rounded border-border accent-primary"
          />

          <span className="text-sm leading-6 text-muted-foreground">
            I confirm that the information provided above is
            accurate and I agree to be contacted by Melvorix
            Institute regarding my enrollment request.
            <span className="text-red-500"> *</span>
          </span>
        </label>
      </div>

      {/* Honeypot */}
      <div
        aria-hidden="true"
        className="absolute left-[-9999px] h-px w-px overflow-hidden"
      >
        <label htmlFor="website">
          Website
        </label>

        <input
          id="website"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          value={form.website}
          onChange={(event) =>
            updateField("website", event.target.value)
          }
        />
      </div>

      {/* Error */}
      {error && (
        <div
          role="alert"
          className="rounded-xl border border-red-500/20 bg-red-500/5 px-4 py-3 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </div>
      )}

      {/* Submit */}
      <div className="space-y-4">
        <button
          type="submit"
          disabled={submitting}
          className="flex h-13 w-full items-center justify-center rounded-xl bg-primary px-6 text-sm font-semibold text-primary-foreground shadow-sm transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? (
            <>
              <svg
                className="mr-2 h-4 w-4 animate-spin"
                viewBox="0 0 24 24"
                fill="none"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                />

                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                />
              </svg>

              Submitting Enrollment...
            </>
          ) : (
            "Submit Enrollment Request"
          )}
        </button>

        <p className="text-center text-xs leading-5 text-muted-foreground">
          No account or registration is required. Your
          information will be securely submitted to the
          Melvorix Institute team.
        </p>
      </div>
    </form>
  );
}