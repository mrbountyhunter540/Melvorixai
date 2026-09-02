import Link from "next/link";

import { siteConfig } from "@/config/site";
import { NewsletterForm } from "@/components/layout/newsletter-form";

// Maps the plain-string labels already in siteConfig.footer to real
// routes, without needing to change that config's shape (so nothing
// else that reads siteConfig.footer breaks).
const LINK_MAP: Record<string, string> = {
  "All Courses": "/courses",
  "AI Automation": "/courses/ai-automation",
  Cybersecurity: "/courses/cybersecurity",
  "Data & Analytics": "/courses/data-analytics",
  "Digital Automation": "/courses/digital-automation",
  "Student Dashboard": "/dashboard",
  "AI Solutions": "/#studio",
  "Custom Software": "/#studio",
  "Automation Systems": "/#studio",
  "Data Intelligence": "/#studio",
  "Our Process": "/#studio",
  "Case Studies": "/#studio",
  "About Melvorix": "/about",
  "Our Mission": "/about",
  Careers: "/about",
  Blog: "/about",
  "Contact Us": "/contact",
  "Help Center": "/contact",
  FAQ: "/#faq",
  "Terms of Service": "/terms",
  "Privacy Policy": "/privacy",
};

function linkFor(label: string) {
  return LINK_MAP[label] ?? "/";
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-[#080B12]">
      <div className="melvorix-container py-16">
        <div className="grid gap-12 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr_0.85fr_1.05fr]">
          {/* BRAND */}

          <div>
            <Link href="/" className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
                M
              </div>
              <span className="font-display text-lg font-bold tracking-[0.1em] text-white">
                MELVORIX
              </span>
            </Link>

            <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
              {siteConfig.tagline}
            </p>

            <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
              {siteConfig.description}
            </p>

            <div className="mt-6 flex gap-3">
              {["FB", "TW", "IN", "IG", "YT"].map((label) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-[10px] font-semibold text-slate-500 transition hover:border-white/15 hover:text-white"
                >
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* ACADEMY */}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Academy
            </h3>
            <div className="mt-5 space-y-3">
              {siteConfig.footer.academy.map((item) => (
                <Link
                  key={item}
                  href={linkFor(item)}
                  className="block text-sm text-slate-600 transition hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* STUDIO */}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Studio
            </h3>
            <div className="mt-5 space-y-3">
              {siteConfig.footer.studio.map((item) => (
                <Link
                  key={item}
                  href={linkFor(item)}
                  className="block text-sm text-slate-600 transition hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* COMPANY */}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Company
            </h3>
            <div className="mt-5 space-y-3">
              {siteConfig.footer.company.map((item) => (
                <Link
                  key={item}
                  href={linkFor(item)}
                  className="block text-sm text-slate-600 transition hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* SUPPORT */}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Support
            </h3>
            <div className="mt-5 space-y-3">
              {siteConfig.footer.support.map((item) => (
                <Link
                  key={item}
                  href={linkFor(item)}
                  className="block text-sm text-slate-600 transition hover:text-white"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>

          {/* NEWSLETTER */}

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
              Newsletter
            </h3>

            <p className="mt-5 text-sm leading-6 text-slate-600">
              Subscribe to get the latest updates on new courses and tech
              insights.
            </p>

            <NewsletterForm />
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-slate-700 sm:flex-row">
          <span>
            &copy; {new Date().getFullYear()} Melvorix. All rights reserved.
          </span>

          <div className="flex gap-5">
            <Link href="/privacy" className="transition hover:text-slate-400">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition hover:text-slate-400">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}