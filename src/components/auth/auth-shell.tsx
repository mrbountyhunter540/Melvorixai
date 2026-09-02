import Link from "next/link";
import { Check } from "lucide-react";
import type { ReactNode } from "react";

const HIGHLIGHTS = [
  "Lifetime access to every Academy track",
  "Real projects, not just video lessons",
  "Certificate of completion on every course",
];

export function AuthShell({
  eyebrow,
  title,
  subtitle,
  children,
  footer,
}: {
  eyebrow: string;
  title: string;
  subtitle: string;
  children: ReactNode;
  footer: ReactNode;
}) {
  return (
    <main className="grid min-h-screen bg-[#0B0F19] text-white lg:grid-cols-2">
      {/* BRAND PANEL */}

      <div className="relative hidden overflow-hidden border-r border-white/[0.06] bg-[#080B12] lg:flex lg:flex-col lg:justify-between lg:p-12">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(99,102,241,0.14),transparent_45%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(34,211,238,0.08),transparent_40%)]" />
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-24 top-1/2 -translate-y-1/2 select-none font-display text-[420px] font-black leading-none text-white/[0.025]"
        >
          M
        </span>

        <Link href="/" className="relative z-10 flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 to-cyan-400 text-base font-bold text-white shadow-[0_0_30px_rgba(99,102,241,0.35)]">
            M
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-display text-lg font-bold tracking-[0.12em] text-white">
              MELVORIX
            </span>
            <span className="mt-1 text-[9px] font-medium uppercase tracking-[0.22em] text-slate-500">
              Automate. Educate. Elevate.
            </span>
          </div>
        </Link>

        <div className="relative z-10 max-w-md">
          <h2 className="font-display text-4xl font-semibold leading-tight tracking-[-0.02em]">
            Learn. Build.
            <br />
            <span className="melvorix-gradient-text">Lead the future.</span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-slate-400">
            Join a growing community of students turning industry-focused
            training into real careers.
          </p>

          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-300">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-400/10">
                  <Check size={12} className="text-indigo-400" />
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative z-10 flex items-center gap-2 text-xs text-slate-600">
          <span>&copy; {new Date().getFullYear()} Melvorix</span>
          <span aria-hidden="true">&middot;</span>
          <Link href="/privacy" className="transition hover:text-slate-400">
            Privacy
          </Link>
          <span aria-hidden="true">&middot;</span>
          <Link href="/terms" className="transition hover:text-slate-400">
            Terms
          </Link>
        </div>
      </div>

      {/* FORM PANEL */}

      <div className="flex flex-col justify-center px-6 py-16 sm:px-12 lg:px-16">
        <div className="mx-auto w-full max-w-sm">
          <Link
            href="/"
            className="mb-10 flex items-center gap-2.5 lg:hidden"
            aria-label="Melvorix home"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
              M
            </div>
            <span className="font-display text-base font-bold tracking-[0.1em] text-white">
              MELVORIX
            </span>
          </Link>

          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-indigo-400">
            {eyebrow}
          </span>

          <h1 className="mt-3 font-display text-3xl font-semibold tracking-[-0.02em] text-white">
            {title}
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">{subtitle}</p>

          <div className="mt-8">{children}</div>

          <div className="mt-8 text-center text-sm text-slate-500">
            {footer}
          </div>
        </div>
      </div>
    </main>
  );
}
