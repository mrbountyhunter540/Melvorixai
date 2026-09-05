
"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { User } from "@supabase/supabase-js";
import { ArrowUpRight, LayoutDashboard, Menu, X } from "lucide-react";

import { siteConfig } from "@/config/site";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { SignOutButton } from "@/components/auth/sign-out-button";

/**
 * Resolve navigation links so hash-based links work from every page.
 */
function resolveNavHref(label: string, href: string) {
  if (label === "About") return "/about";
  if (href.startsWith("#")) return `/${href}`;
  return href;
}

export function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [user, setUser] = useState<User | null>(null);
  const [checkedAuth, setCheckedAuth] = useState(false);

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      setCheckedAuth(true);
      return;
    }

    const supabase = createClient();

    supabase.auth.getUser().then(({ data }) => {
      setUser(data.user);
      setCheckedAuth(true);
    });

    const { data: subscription } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setUser(session?.user ?? null);
      }
    );

    return () => subscription.subscription.unsubscribe();
  }, []);

  const initial =
    (user?.user_metadata?.full_name as string | undefined)?.charAt(0) ||
    user?.email?.charAt(0) ||
    "?";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.06] bg-[#0B0F19]/85 backdrop-blur-xl">
      <div className="melvorix-container flex h-20 items-center justify-between">

        {/* =========================================================
            LOGO
        ========================================================== */}
        <Link
          href="/"
          aria-label="Melvorix home"
          className="group flex shrink-0 items-center"
        >
          <img
            src="/melvorix-logo.png"
            alt="Melvorix"
            className="
              block
              h-auto
              w-[185px]
              object-contain
              transition-all
              duration-300
              group-hover:scale-[1.02]
            "
            draggable={false}
          />
        </Link>

        {/* =========================================================
            DESKTOP NAVIGATION
        ========================================================== */}
        <div className="hidden items-center gap-7 lg:flex">
          {siteConfig.navigation.map((item) => (
            <Link
              key={item.label}
              href={resolveNavHref(item.label, item.href)}
              className="
                text-sm
                font-medium
                text-slate-400
                transition-colors
                duration-200
                hover:text-white
              "
            >
              {item.label}
            </Link>
          ))}

          <Link
            href="/courses"
            className="
              text-sm
              font-medium
              text-slate-400
              transition-colors
              duration-200
              hover:text-white
            "
          >
            Courses
          </Link>
        </div>

        {/* =========================================================
            DESKTOP ACTIONS
        ========================================================== */}
        <div className="hidden items-center gap-3 lg:flex">
          {!checkedAuth ? (
            <div className="h-9 w-24 animate-pulse rounded-xl bg-white/[0.04]" />
          ) : user ? (
            <>
              <Link
                href="/dashboard"
                className="
                  flex
                  items-center
                  gap-2
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-300
                  transition
                  hover:text-white
                "
              >
                <LayoutDashboard size={16} />
                Dashboard
              </Link>

              <Link
                href="/dashboard"
                aria-label="Your account"
                className="
                  flex
                  h-9
                  w-9
                  items-center
                  justify-center
                  rounded-full
                  bg-gradient-to-br
                  from-indigo-500
                  to-cyan-400
                  text-xs
                  font-bold
                  uppercase
                  text-white
                "
              >
                {initial}
              </Link>

              <SignOutButton
                className="
                  rounded-xl
                  px-3
                  py-2
                  text-sm
                  font-medium
                  text-slate-400
                  transition
                  hover:text-white
                "
              />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="
                  rounded-xl
                  px-4
                  py-2.5
                  text-sm
                  font-medium
                  text-slate-300
                  transition-colors
                  hover:text-white
                "
              >
                Log In
              </Link>

              <Link
                href="/register"
                className="
                  group
                  inline-flex
                  items-center
                  gap-1.5
                  rounded-xl
                  bg-indigo-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_0_30px_rgba(99,102,241,0.25)]
                  transition-all
                  duration-300
                  hover:bg-indigo-400
                  hover:shadow-[0_0_40px_rgba(99,102,241,0.35)]
                "
              >
                Get Started

                <ArrowUpRight
                  size={15}
                  className="
                    transition-transform
                    duration-300
                    group-hover:-translate-y-0.5
                    group-hover:translate-x-0.5
                  "
                />
              </Link>
            </>
          )}
        </div>

        {/* =========================================================
            MOBILE TRIGGER
        ========================================================== */}
        <button
          type="button"
          onClick={() => setMobileOpen((value) => !value)}
          className="
            flex
            h-10
            w-10
            items-center
            justify-center
            rounded-xl
            border
            border-white/10
            bg-white/[0.03]
            text-slate-300
            transition-colors
            hover:bg-white/[0.06]
            lg:hidden
          "
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* =========================================================
          MOBILE NAVIGATION
      ========================================================== */}
      {mobileOpen && (
        <div className="border-t border-white/[0.06] bg-[#0B0F19] lg:hidden">
          <div className="melvorix-container flex flex-col py-3">

            {siteConfig.navigation.map((item) => (
              <Link
                key={item.label}
                href={resolveNavHref(item.label, item.href)}
                onClick={() => setMobileOpen(false)}
                className="
                  rounded-xl
                  px-3
                  py-3
                  text-sm
                  font-medium
                  text-slate-300
                  transition-colors
                  hover:bg-white/[0.04]
                  hover:text-white
                "
              >
                {item.label}
              </Link>
            ))}

            <Link
              href="/courses"
              onClick={() => setMobileOpen(false)}
              className="
                rounded-xl
                px-3
                py-3
                text-sm
                font-medium
                text-slate-300
                transition-colors
                hover:bg-white/[0.04]
                hover:text-white
              "
            >
              Courses
            </Link>

            <div className="my-2 h-px bg-white/[0.06]" />

            {user ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Dashboard
                </Link>

                <SignOutButton
                  className="
                    mt-1
                    rounded-xl
                    bg-white/[0.04]
                    px-3
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-slate-200
                  "
                />
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileOpen(false)}
                  className="
                    rounded-xl
                    px-3
                    py-3
                    text-sm
                    font-medium
                    text-slate-300
                  "
                >
                  Log In
                </Link>

                <Link
                  href="/register"
                  onClick={() => setMobileOpen(false)}
                  className="
                    mt-1
                    rounded-xl
                    bg-indigo-500
                    px-3
                    py-3
                    text-center
                    text-sm
                    font-semibold
                    text-white
                  "
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}

