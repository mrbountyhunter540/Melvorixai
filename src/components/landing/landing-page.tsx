"use client";
import Image from "next/image";
import {
  ArrowRight,
  Award,
  BarChart3,
  BookOpen,
  Briefcase,
  ChevronDown,
  Code2,
  Cpu,
  GraduationCap,
  MessageCircle,
  Play,
  Rocket,
  Send,
  Settings2,
  Star,
  TrendingUp,
  Trophy,
  UserCheck,
  Users,
} from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";

import { CharacterStage } from "@/components/hero/character-stage";
import { siteConfig } from "@/config/site";

/* =========================================================
   ICON MAPS
   ========================================================= */

const whyChooseIcons = [GraduationCap, Code2, Rocket, Trophy];
const statIcons = [Users, Briefcase, UserCheck, TrendingUp];
const studioIcons = [Cpu, Code2, Settings2, BarChart3];
/* =========================================================
   TEAM
   ========================================================= */

function FemaleAvatar({ className = "" }: { className?: string }) {
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#171D35] via-[#111827] to-[#0B0F19] ${className}`}
      aria-label="Female avatar for Mam Saleem Akhtar"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_32%,rgba(129,140,248,0.22),transparent_45%)]" />
      <svg
        viewBox="0 0 200 200"
        className="relative h-[72%] w-[72%] text-indigo-300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M100 29c-31 0-55 25-55 56v22c0 13 5 25 13 34 8-17 23-28 42-28s34 11 42 28c8-9 13-21 13-34V85c0-31-24-56-55-56Z"
          fill="currentColor"
          opacity=".18"
        />
        <circle cx="100" cy="82" r="36" fill="currentColor" opacity=".9" />
        <path
          d="M51 178c5-31 23-48 49-48s44 17 49 48"
          stroke="currentColor"
          strokeWidth="14"
          strokeLinecap="round"
          opacity=".9"
        />
        <path
          d="M68 78c6-8 17-13 32-13 14 0 26 5 32 13"
          stroke="#0B0F19"
          strokeWidth="5"
          strokeLinecap="round"
          opacity=".7"
        />
        <path
          d="M84 96c10 7 22 7 32 0"
          stroke="#0B0F19"
          strokeWidth="4"
          strokeLinecap="round"
          opacity=".55"
        />
      </svg>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#090D15]/70 to-transparent" />
    </div>
  );
}

const teamMembers = [

  {
  name: "Awais Khan",
  role: "Founder & Chief Executive Officer",
  shortRole: "CEO",
  bio: "A Principal at Dar-e-Arqam School with an MS in Computational Mathematics, Awais brings strong expertise in mathematics, data analytics, and analytical problem-solving. He leads Melvorix’s overall vision, operations, and strategic growth, combining academic insight with data-driven decision-making to build scalable opportunities.",
  image: "/images/team/Awais-khanf.jpg",
  phone: "",
  linkedin: "#",
},

{
  name: "Naeem Abbas",
  role: "Founder & Chief Growth Officer",
  shortRole: "CGO",
  bio: "An experienced Mathematics teacher with an MS in Mathematics, Naeem combines a strong academic foundation with expertise in Artificial Intelligence and Machine Learning. At Melvorix, he focuses on strategic growth, partnerships, innovation, and market expansion while helping connect technology with practical opportunities.",
  image: "/images/team/Naeem-abbasf.jpg",
  phone: "",
  linkedin: "#",
},

{
  name: "Burhan Khan",
  role: "Founder & Chief Technology Officer",
  shortRole: "CTO",
  bio: "A Software Engineer andCertified Ethical Hacker (CEH), Digital Forensics Expert, AI/ML Engineer, AI Automation Engineer, and Blockchain Smart Contract Developer, Burhan leads Melvorix’s technology and innovation initiatives. He specializes in AI-powered systems, automation, cybersecurity, digital forensics, and emerging technologies. He is also the CEO of StitchArc Sports, combining technical expertise with entrepreneurial experience to build practical digital solutions and scalable ventures.",
  image: "/images/team/burhan-khanf.png",
  phone: "+923037738456",
  linkedin: "#",
},

{
  name: "Azhar Fareed",
  role: "Founder & Chief AI Officer",
  shortRole: "CAIO",
  bio: "A Software Engineer and Certified Ethical Hacker, Social Media Specialist, and Social Media Automation Expert, Azhar focuses on combining technology, AI, and digital marketing to create smarter growth systems. He leads Melvorix’s AI and social automation initiatives, exploring intelligent workflows, content systems, and emerging technologies that help businesses operate and grow more efficiently.",
  image: "/images/team/azhar-fareed.jpg",
  phone: "",
  linkedin: "#",
},

{
  name: "Mam Saleem Akhtar",
  role: "Head of Student Affairs",
  shortRole: "HSA",
  bio: "A dedicated coordinator at Informatics College, Saleem Akhtar brings extensive experience in student affairs, academic coordination, administration, and student management. She plays a key role in creating an organized and supportive learning environment, ensuring effective communication, student engagement, and smooth academic operations at Melvorix.",
  image: "/images/team/saleem-aktharf.jpg",
  phone: "",
  linkedin: "#",
},

 
];


/* =========================================================
   CHARACTER HAND ANCHOR
   ========================================================= */

const HAND_ANCHOR = { left: "9%", top: "27%" };

/* =========================================================
   LANDING PAGE
   ========================================================= */

export function LandingPage() {
  const shouldReduceMotion = useReducedMotion();

const [activeCourse, setActiveCourse] = useState(0);
const [activeTestimonial, setActiveTestimonial] = useState(0);
const [openFaq, setOpenFaq] = useState<number | null>(0);
const [selectedTeamMember, setSelectedTeamMember] = useState<
  (typeof teamMembers)[number] | null
>(null);
  const course = siteConfig.courses[activeCourse];

  /* ---------------------------------------------------------
     DYNAMIC CLEARANCE
  --------------------------------------------------------- */

  const frameElRef = useRef<HTMLDivElement | null>(null);
  const cardElRef = useRef<HTMLDivElement | null>(null);
  const resizeObserverRef = useRef<ResizeObserver | null>(null);
  const [clearance, setClearance] = useState(0);

  const recomputeClearance = useCallback(() => {
    const frame = frameElRef.current;
    const card = cardElRef.current;

    if (!frame || !card) return;

    const anchorTopPx =
      (frame.offsetHeight * parseFloat(HAND_ANCHOR.top)) / 100;

    const overflow = card.offsetHeight - anchorTopPx;

    setClearance(overflow > 0 ? Math.ceil(overflow) + 24 : 0);
  }, []);

  const setFrameNode = useCallback(
    (node: HTMLDivElement | null) => {
      frameElRef.current = node;

      if (node) {
        resizeObserverRef.current?.observe(node);
        recomputeClearance();
      }
    },
    [recomputeClearance],
  );

  const setCardNode = useCallback(
    (node: HTMLDivElement | null) => {
      cardElRef.current = node;

      if (node) {
        resizeObserverRef.current?.observe(node);
        recomputeClearance();
      }
    },
    [recomputeClearance],
  );

  useEffect(() => {
    resizeObserverRef.current = new ResizeObserver(recomputeClearance);

    if (frameElRef.current) {
      resizeObserverRef.current.observe(frameElRef.current);
    }

    if (cardElRef.current) {
      resizeObserverRef.current.observe(cardElRef.current);
    }

    return () => resizeObserverRef.current?.disconnect();
  }, [recomputeClearance]);

  return (
    <main className="min-h-screen overflow-hidden bg-[#0B0F19] text-white">
      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_38%,rgba(99,102,241,0.12),transparent_35%)]" />

        <div className="melvorix-container relative flex min-h-screen items-center pt-28 lg:pt-24">
          <div className="grid w-full items-center gap-12 lg:grid-cols-[0.95fr_1.05fr]">
            {/* HERO CONTENT */}

            <motion.div
              initial={
                shouldReduceMotion ? false : { opacity: 0, y: 24 }
              }
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative z-10 max-w-2xl"
            >
              <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/[0.06] px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

                <span className="text-xs font-medium uppercase tracking-[0.18em] text-indigo-200">
                  Tech Academy &times; Software Studio
                </span>
              </div>

              <h1 className="font-display text-5xl font-extrabold uppercase leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-[64px]">
                Learn.
                <br />
                Build.
                <br />
                Automate.
                <br />
                <span className="melvorix-gradient-text">
                  Lead the future.
                </span>
              </h1>

              <p className="mt-7 max-w-xl text-base leading-8 text-slate-400 sm:text-lg">
                Industry-focused education and next-gen solutions that turn
                your skills into real opportunities.
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#academy"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
                >
                  Explore Courses
                  <ArrowRight size={16} />
                </a>

                <a
                  href="#studio"
                  className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.06]"
                >
                  Our Services
                  <Play size={14} />
                </a>
              </div>

              {/* STATS */}

              <div className="mt-14 grid grid-cols-2 gap-y-6 sm:grid-cols-4 sm:gap-6">
                {siteConfig.stats.map((stat, index) => {
                  const Icon = statIcons[index];

                  return (
                    <div
                      key={stat.label}
                      className="flex items-center gap-2.5"
                    >
                      <Icon size={18} className="text-indigo-400" />

                      <div>
                        <div className="font-display text-xl font-bold text-white">
                          {stat.value}
                        </div>

                        <div className="text-xs text-slate-500">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </motion.div>

            {/* HERO CHARACTER */}

            <motion.div
              initial={
                shouldReduceMotion
                  ? false
                  : { opacity: 0, scale: 0.96 }
              }
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.15 }}
              className="relative h-[480px] sm:h-[600px] lg:h-[700px]"
            >
              <span
                aria-hidden="true"
                className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none font-display text-[420px] font-black leading-none text-white/[0.025]"
              >
                M
              </span>

              <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-indigo-500/[0.08] blur-[110px]" />

              <CharacterStage
                mode="wave"
                hand="right"
                priority
              />
            </motion.div>
          </div>
        </div>

        <div className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 md:flex">
          <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600">
            Scroll to explore
          </span>

          <span className="flex h-9 w-6 items-start justify-center rounded-full border border-white/15 pt-1.5">
            <span className="h-1.5 w-1 rounded-full bg-slate-400" />
          </span>
        </div>
      </section>

      {/* =====================================================
          TECH STACK STRIP
      ===================================================== */}

      <section className="border-y border-white/[0.05] bg-[#080B12] py-8">
        <div className="melvorix-container flex flex-col items-center gap-6 lg:flex-row lg:justify-between">
          <span className="shrink-0 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-600">
            Built on tools engineering teams already trust
          </span>

          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 lg:justify-end">
            {siteConfig.techStack.map((tool) => (
              <span
                key={tool}
                className="font-display text-sm font-semibold tracking-wide text-slate-500 transition hover:text-slate-300"
              >
                {tool}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          WHY CHOOSE MELVORIX
      ===================================================== */}

      <section className="border-b border-white/[0.05] bg-white/[0.015] py-16">
        <div className="melvorix-container">
          <p className="mb-12 text-center text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">
            Why Choose Melvorix?
          </p>

          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
            {siteConfig.whyChoose.map((item, index) => {
              const Icon = whyChooseIcons[index];

              return (
                <div
                  key={item.title}
                  className="flex flex-col items-center text-center"
                >
                  <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl border border-indigo-400/15 bg-indigo-400/[0.06]">
                    <Icon
                      size={26}
                      className="text-indigo-400"
                    />
                  </div>

                  <h3 className="font-display text-base font-semibold text-white">
                    {item.title}
                  </h3>

                  <p className="mt-2 max-w-[220px] text-sm leading-6 text-slate-500">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          ACADEMY / SKILLS
      ===================================================== */}

      <section
        id="academy"
        className="relative border-b border-white/[0.05] py-28 sm:py-36"
      >
        <div className="melvorix-container">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-start">
            {/* LEFT: HEADING + TABS */}

            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
                01 / Melvorix Academy
              </span>

              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                Skills that{" "}
                <span className="melvorix-gradient-text">
                  actually change
                </span>{" "}
                your life.
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
                No outdated theory. No endless lectures. Learn by building
                real projects that create real opportunities.
              </p>

              <div className="mt-10 grid gap-2.5">
                {siteConfig.courses.map((item, index) => {
                  const isActive = activeCourse === index;

                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setActiveCourse(index)}
                      className={`group relative flex items-center gap-4 overflow-hidden rounded-xl border p-4 text-left transition-all duration-300 ${
                        isActive
                          ? "border-transparent bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 shadow-[0_10px_35px_-8px_rgba(99,102,241,0.55)]"
                          : "border-white/[0.07] bg-gradient-to-br from-white/[0.035] to-white/[0.005] hover:border-white/[0.14] hover:from-white/[0.06] hover:to-white/[0.01]"
                      }`}
                    >
                      {!isActive && (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 left-0 w-[3px] scale-y-0 bg-gradient-to-b from-indigo-400 to-cyan-400 transition-transform duration-300 group-hover:scale-y-100"
                        />
                      )}

                      <span
                        className={`font-mono text-[10px] ${
                          isActive
                            ? "text-white/70"
                            : "text-slate-600"
                        }`}
                      >
                        {item.number}
                      </span>

                      <span
                        className={`flex-1 text-sm font-semibold uppercase tracking-wide ${
                          isActive
                            ? "text-white"
                            : "text-slate-300"
                        }`}
                      >
                        {item.title}
                      </span>

                      {isActive && (
                        <span
                          aria-hidden="true"
                          className="pointer-events-none absolute inset-0 bg-gradient-to-r from-white/[0.08] via-transparent to-transparent"
                        />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* RIGHT: CHARACTER + HAND-ANCHORED COURSE CARD */}

            <div className="relative flex flex-col items-center lg:items-end">
              <div
                style={{ height: clearance }}
                aria-hidden="true"
              />

              <div className="relative flex justify-center lg:justify-end">
                <div className="pointer-events-none absolute right-10 top-1/2 h-[440px] w-[440px] -translate-y-1/2 rounded-full bg-indigo-500/[0.07] blur-[110px]" />

                {/* CHARACTER FRAME */}

                <div
                  ref={setFrameNode}
                  className="relative h-[380px] w-[260px] sm:h-[500px] sm:w-[340px] lg:h-[600px] lg:w-[400px]"
                  style={{ perspective: 1000 }}
                >
                  <CharacterStage
                    mode="present"
                    hand="right"
                  />

                  {/* COURSE CARD */}

                  <div
                    className="absolute z-20"
                    style={{
                      left: HAND_ANCHOR.left,
                      top: HAND_ANCHOR.top,
                      transform: "translate(-50%, -100%)",
                    }}
                  >
                    <AnimatePresence
                      mode="wait"
                      initial={false}
                    >
                      <motion.div
                        ref={setCardNode}
                        key={course.id}
                        initial={
                          shouldReduceMotion
                            ? false
                            : {
                                opacity: 0,
                                rotateX: -80,
                                y: -14,
                                scale: 0.92,
                              }
                        }
                        animate={{
                          opacity: 1,
                          rotateX: 0,
                          y: 0,
                          scale: 1,
                        }}
                        exit={
                          shouldReduceMotion
                            ? { opacity: 0 }
                            : {
                                opacity: 0,
                                rotateX: 45,
                                y: 6,
                                scale: 0.97,
                                transition: {
                                  duration: 0.16,
                                  ease: "easeIn",
                                },
                              }
                        }
                        transition={{
                          duration: 0.45,
                          delay: shouldReduceMotion
                            ? 0
                            : 0.32,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{
                          transformOrigin: "bottom center",
                          transformStyle: "preserve-3d",
                        }}
                        className="melvorix-glass relative w-[210px] overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-br from-[#1B2036] via-[#12162A] to-[#0B0F19] p-4 shadow-[0_25px_80px_rgba(0,0,0,0.55)] sm:w-56"
                      >
                        {/* PREMIUM GRADIENT SHEEN */}

                        <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-indigo-500/[0.14] via-transparent to-cyan-400/[0.08]" />

                        <div className="pointer-events-none absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-indigo-400 via-cyan-300 to-indigo-400" />

                        <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-indigo-400/[0.15] blur-2xl" />

                        <div className="relative">
                          <span
                            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[9px] font-semibold uppercase tracking-[0.14em] ${
                              course.accent === "cyan"
                                ? "bg-cyan-400/10 text-cyan-300"
                                : "bg-indigo-400/10 text-indigo-300"
                            }`}
                          >
                            {course.number} / {course.category}
                          </span>

                          <h3 className="mt-2.5 font-display text-base font-bold uppercase tracking-tight text-white sm:text-lg">
                            {course.title}
                          </h3>

                          <p className="mt-1.5 line-clamp-1 text-[11px] leading-4 text-slate-400">
                            {course.description}
                          </p>

                          <ul className="mt-2.5 space-y-1.5">
                            <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                              <BookOpen
                                size={12}
                                className="text-indigo-400"
                              />
                              {course.modules}
                            </li>

                            <li className="flex items-center gap-1.5 text-[11px] text-slate-300">
                              <Award
                                size={12}
                                className="text-indigo-400"
                              />
                              Certificate of Completion
                            </li>
                          </ul>

                          <div className="mt-2.5 flex items-center gap-1.5">
                            <span className="font-display text-lg font-bold text-white">
                              {course.price}
                            </span>

                            <span className="text-[11px] text-slate-500 line-through">
                              {course.oldPrice}
                            </span>

                            <span className="rounded-full bg-emerald-400/10 px-1.5 py-0.5 text-[9px] font-semibold text-emerald-400">
                              {course.discount}
                            </span>
                          </div>

                          {/* =================================================
                              FIXED PUBLIC ENROLLMENT BUTTON

                              IMPORTANT:
                              This no longer points to #academy.

                              It dynamically opens the enrollment page for
                              the currently selected course.

                              Example:
                              /courses/ai-automation/enroll
                              /courses/cybersecurity/enroll
                              ================================================= */}

                          <a
                            href={`/courses/${course.id}/enroll`}
                            className="mt-2.5 flex h-9 w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-indigo-600 via-indigo-500 to-blue-500 text-xs font-semibold text-white shadow-[0_6px_20px_-4px_rgba(99,102,241,0.6)] transition hover:from-indigo-500 hover:to-blue-400"
                          >
                            Enroll Now
                            <ArrowRight size={14} />
                          </a>

                          <div className="mt-2.5 flex items-center justify-center gap-1.5">
                            {siteConfig.courses.map(
                              (item, index) => (
                                <button
                                  key={item.id}
                                  type="button"
                                  onClick={() =>
                                    setActiveCourse(index)
                                  }
                                  aria-label={`Show ${item.title}`}
                                  className={`h-1.5 rounded-full transition-all ${
                                    activeCourse === index
                                      ? "w-5 bg-gradient-to-r from-indigo-400 to-cyan-300"
                                      : "w-1.5 bg-white/20"
                                  }`}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      </motion.div>
                    </AnimatePresence>

                    {/* GLOW ORB */}

                    <div className="relative mx-auto mt-3 h-9 w-32">
                      <div className="absolute inset-0 rounded-full bg-indigo-400/25 blur-2xl" />

                      <div className="absolute left-1/2 top-1/2 h-[3px] w-24 -translate-x-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" />

                      <span
                        aria-hidden="true"
                        className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_24px_8px_rgba(34,211,238,0.75)]"
                      />

                      {[0, 1].map((ring) => (
                        <span
                          key={ring}
                          className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan-300/25"
                          style={{
                            width: `${28 + ring * 26}px`,
                            height: `${10 + ring * 8}px`,
                          }}
                        />
                      ))}

                      {/* BLAST */}

                      {!shouldReduceMotion && (
                        <motion.span
                          key={`blast-${course.id}`}
                          aria-hidden="true"
                          initial={{
                            scale: 0.2,
                            opacity: 1,
                          }}
                          animate={{
                            scale: [0.2, 2.2, 2.8],
                            opacity: [1, 0.4, 0],
                          }}
                          transition={{
                            duration: 0.48,
                            ease: "easeOut",
                          }}
                          className="absolute left-1/2 top-1/2 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300/70 blur-md"
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================
          STUDIO
      ===================================================== */}

      <section
        id="studio"
        className="border-b border-white/[0.05] bg-[#090D15] py-28 sm:py-36"
      >
        <div className="melvorix-container">
          <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:items-center">
            <div>
              <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
                02 / Technology Studio
              </span>

              <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
                We build{" "}
                <span className="melvorix-gradient-text">
                  intelligent solutions
                </span>{" "}
                for modern businesses.
              </h2>

              <p className="mt-6 max-w-md text-base leading-8 text-slate-400">
                From automation to custom software, we turn ideas into
                scalable digital products that drive real results.
              </p>

              <a
                href="#contact"
                className="mt-9 inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.2)] transition hover:bg-indigo-400"
              >
                Start a Project
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              {siteConfig.studioServices.map(
                (service, index) => {
                  const Icon = studioIcons[index];

                  return (
                    <div
                      key={service.title}
                      className="rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6 transition hover:bg-white/[0.04]"
                    >
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-cyan-400/15 bg-cyan-400/[0.06]">
                        <Icon
                          size={20}
                          className="text-cyan-400"
                        />
                      </div>

                      <h3 className="mt-5 font-display text-sm font-semibold uppercase tracking-wide text-white">
                        {service.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-500">
                        {service.description}
                      </p>
                    </div>
                  );
                },
              )}
            </div>
          </div>
        </div>
      </section>


      {/* =====================================================
          TEAM
      ===================================================== */}

      <section
        id="team"
        className="relative overflow-hidden border-b border-white/[0.05] py-28 sm:py-36"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-0 h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-indigo-500/[0.055] blur-[120px]"
        />

        <div className="melvorix-container relative">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
              03 / The People Behind Melvorix
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Built by people who{" "}
              <span className="melvorix-gradient-text">build.</span>
            </h2>

            <p className="mx-auto mt-6 max-w-xl text-base leading-8 text-slate-400">
              A multidisciplinary team combining technology, AI, education,
              and growth to turn ambitious ideas into real-world outcomes.
            </p>
          </div>

          <div className="mx-auto mt-16 grid max-w-6xl gap-5 sm:grid-cols-2 lg:grid-cols-6">
            {teamMembers.map((member, index) => (
              <article
                key={member.name}
                className={[
                  "group relative overflow-hidden rounded-2xl border border-white/[0.08]",
                  "bg-white/[0.025] transition-all duration-500",
                  "hover:-translate-y-1 hover:border-indigo-400/20 hover:bg-white/[0.04]",
                  "lg:col-span-2",
                  index === 3 ? "lg:col-start-2" : "",
                  index === 4 ? "lg:col-start-4" : "",
                ].join(" ")}
              >
                <div className="relative aspect-[4/4.5] overflow-hidden bg-[#111827]">
                  {member.name === "Mam Saleem Akhtar" ? (
                    <FemaleAvatar className="absolute inset-0 h-full w-full transition duration-700 group-hover:scale-[1.035]" />
                  ) : (
                    <Image
                      src={member.image}
                      alt={`${member.name} — ${member.role}`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover object-center grayscale-[15%] transition duration-700 group-hover:scale-[1.035] group-hover:grayscale-0"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-[#090D15] via-transparent to-transparent opacity-90" />

                  <div className="absolute left-5 top-5">
                    <span className="inline-flex rounded-full border border-white/10 bg-[#0B0F19]/75 px-3 py-1.5 font-mono text-[10px] uppercase tracking-[0.16em] text-slate-300 backdrop-blur-md">
                      {member.shortRole}
                    </span>
                  </div>

                  <div className="pointer-events-none absolute -bottom-16 left-1/2 h-32 w-32 -translate-x-1/2 rounded-full bg-indigo-500/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
                </div>

                <div className="p-6">
                  <h3 className="font-display text-lg font-semibold tracking-[-0.02em] text-white">
                    {member.name}
                  </h3>

                  <p className="mt-1 text-xs font-medium text-indigo-400">
                    {member.role}
                  </p>

                  <p className="mt-4 line-clamp-2 min-h-[48px] text-sm leading-6 text-slate-500">
  {member.bio}
</p>

<button
  type="button"
  onClick={() => setSelectedTeamMember(member)}
  className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 transition hover:text-indigo-300"
>
  Read More
  <ArrowRight size={13} />
</button>

                  <div className="mt-6 flex items-center gap-2 border-t border-white/[0.06] pt-5">
                    <a
                      href={member.linkedin}
                      aria-label={`${member.name} on LinkedIn`}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-slate-500 transition hover:border-indigo-400/20 hover:bg-indigo-400/[0.06] hover:text-indigo-400"
                    >
                      <span className="text-xs font-bold">in</span>
                    </a>

                    {member.phone && (
                      <a
                        href={`tel:${member.phone}`}
                        aria-label={`Contact ${member.name}`}
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] bg-white/[0.02] text-slate-500 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.06] hover:text-cyan-400"
                      >
                        <MessageCircle size={15} />
                      </a>
                    )}

                    <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.14em] text-slate-600">
                      Melvorix Team
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="mx-auto mt-14 flex max-w-3xl items-center justify-center gap-4 text-center">
            <div className="hidden h-px flex-1 bg-gradient-to-r from-transparent to-white/[0.08] sm:block" />

            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-slate-600">
              Technology · Intelligence · Education · Growth
            </p>

            <div className="hidden h-px flex-1 bg-gradient-to-l from-transparent to-white/[0.08] sm:block" />
          </div>
        </div>
      </section>

      <AnimatePresence>
  {selectedTeamMember && (
    <motion.div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={() => setSelectedTeamMember(null)}
    >
      <motion.div
        role="dialog"
        aria-modal="true"
        aria-labelledby="team-member-name"
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 20, scale: 0.96 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={
          shouldReduceMotion
            ? { opacity: 0 }
            : { opacity: 0, y: 10, scale: 0.97 }
        }
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-2xl overflow-hidden rounded-3xl border border-white/[0.08] bg-[#0B0F19] shadow-[0_30px_100px_rgba(0,0,0,0.7)]"
      >
        {/* Top glow */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-indigo-500/[0.12] to-transparent" />

        <div className="relative p-7 sm:p-9">
          {/* Close */}
          <button
            type="button"
            onClick={() => setSelectedTeamMember(null)}
            aria-label="Close team member details"
            className="absolute right-5 top-5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/[0.07] bg-white/[0.03] text-slate-400 transition hover:border-white/15 hover:bg-white/[0.06] hover:text-white"
          >
            ×
          </button>

          {/* Member header */}
          <div className="flex items-center gap-4 pr-10">
            <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-2xl border border-white/[0.08]">
              {selectedTeamMember.name === "Mam Saleem Akhtar" ? (
                <FemaleAvatar className="absolute inset-0 h-full w-full" />
              ) : (
                <Image
                  src={selectedTeamMember.image}
                  alt={selectedTeamMember.name}
                  fill
                  sizes="64px"
                  className="object-cover"
                />
              )}
            </div>

            <div>
              <h3
                id="team-member-name"
                className="font-display text-xl font-semibold tracking-tight text-white"
              >
                {selectedTeamMember.name}
              </h3>

              <p className="mt-1 text-xs font-medium text-indigo-400">
                {selectedTeamMember.role}
              </p>
            </div>
          </div>

          {/* Full bio */}
          <div className="mt-7 border-t border-white/[0.06] pt-6">
            <p className="text-sm leading-7 text-slate-400 sm:text-base sm:leading-8">
              {selectedTeamMember.bio}
            </p>
          </div>

          {/* Footer */}
          <div className="mt-7 flex items-center justify-between border-t border-white/[0.06] pt-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-slate-600">
              Melvorix Team
            </span>

            <button
              type="button"
              onClick={() => setSelectedTeamMember(null)}
              className="rounded-xl border border-white/[0.08] bg-white/[0.03] px-4 py-2 text-xs font-semibold text-slate-300 transition hover:bg-white/[0.06] hover:text-white"
            >
              Close
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )}
</AnimatePresence> 

      {/* =====================================================
          PROCESS
      ===================================================== */}

      <section className="relative overflow-hidden border-b border-white/[0.05] py-28 sm:py-36">
        <div className="melvorix-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
              04 / How We Build
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              From first call to{" "}
              <span className="melvorix-gradient-text">
                production
              </span>
              .
            </h2>

            <p className="mt-6 text-base leading-8 text-slate-400">
              Every studio engagement — from a focused MVP to a
              six-figure platform build — runs through the same four
              stages, so nothing gets lost in translation.
            </p>
          </div>

          <div className="relative mx-auto mt-16 grid max-w-5xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
            <div
              aria-hidden="true"
              className="absolute left-0 right-0 top-[38px] hidden h-px bg-gradient-to-r from-transparent via-white/10 to-transparent lg:block"
            />

            {siteConfig.process.map((step, index) => (
              <motion.div
                key={step.number}
                initial={
                  shouldReduceMotion
                    ? false
                    : { opacity: 0, y: 20 }
                }
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  margin: "-80px",
                }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="relative rounded-2xl border border-white/[0.07] bg-white/[0.02] p-6"
              >
                <span className="font-display text-2xl font-bold text-indigo-400/70">
                  {step.number}
                </span>

                <h3 className="mt-4 font-display text-base font-semibold uppercase tracking-wide text-white">
                  {step.title}
                </h3>

                <p className="mt-2 text-sm leading-6 text-slate-500">
                  {step.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================
          TESTIMONIALS
      ===================================================== */}

      <section className="border-b border-white/[0.05] py-28 sm:py-36">
        <div className="melvorix-container">
          <div className="mx-auto max-w-2xl text-center">
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
              05 / What Our Students Say
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Real people. Real results.
            </h2>
          </div>

          <div className="mx-auto mt-16 grid max-w-5xl gap-5 md:grid-cols-3">
            {siteConfig.testimonials.map((item) => (
              <div
                key={item.name}
                className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-7"
              >
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-cyan-400 text-sm font-bold text-white">
                    {item.name.charAt(0)}
                  </div>

                  <div>
                    <div className="text-sm font-semibold text-white">
                      {item.name}
                    </div>

                    <div className="text-xs text-slate-500">
                      {item.role}
                    </div>
                  </div>
                </div>

                <p className="mt-5 text-sm leading-7 text-slate-400">
                  {item.quote}
                </p>

                <div className="mt-5 flex gap-1">
                  {Array.from({ length: 5 }).map(
                    (_, i) => (
                      <Star
                        key={i}
                        size={14}
                        className="fill-amber-400 text-amber-400"
                      />
                    ),
                  )}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 flex items-center justify-center gap-1.5">
            {siteConfig.testimonials.map(
              (item, index) => (
                <button
                  key={item.name}
                  type="button"
                  onClick={() =>
                    setActiveTestimonial(index)
                  }
                  aria-label={`Show testimonial ${index + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    activeTestimonial === index
                      ? "w-5 bg-indigo-400"
                      : "w-1.5 bg-white/20"
                  }`}
                />
              ),
            )}
          </div>
        </div>
      </section>

      {/* =====================================================
          FAQ
      ===================================================== */}

      <section
        id="faq"
        className="border-b border-white/[0.05] bg-[#090D15] py-28 sm:py-36"
      >
        <div className="melvorix-container grid gap-14 lg:grid-cols-[0.7fr_1.3fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-cyan-400">
              06 / Questions, Answered
            </span>

            <h2 className="mt-5 font-display text-4xl font-semibold tracking-[-0.03em] sm:text-5xl">
              Still deciding?
            </h2>

            <p className="mt-6 max-w-sm text-base leading-8 text-slate-400">
              The most common questions from students and studio clients.
              Can&apos;t find what you need?
            </p>

            <a
              href="#contact"
              className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-indigo-400 transition hover:text-indigo-300"
            >
              Talk to the team
              <ArrowRight size={16} />
            </a>
          </div>

          <div className="divide-y divide-white/[0.06] rounded-2xl border border-white/[0.07] bg-white/[0.02]">
            {siteConfig.faqs.map((faq, index) => {
              const isOpen = openFaq === index;

              return (
                <div key={faq.question}>
                  <button
                    type="button"
                    onClick={() =>
                      setOpenFaq(isOpen ? null : index)
                    }
                    aria-expanded={isOpen}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="font-display text-sm font-semibold text-white sm:text-base">
                      {faq.question}
                    </span>

                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-slate-500 transition-transform duration-300 ${
                        isOpen
                          ? "rotate-180 text-indigo-400"
                          : ""
                      }`}
                    />
                  </button>

                  <motion.div
                    initial={false}
                    animate={{
                      height: isOpen ? "auto" : 0,
                      opacity: isOpen ? 1 : 0,
                    }}
                    transition={{
                      duration: 0.3,
                      ease: "easeInOut",
                    }}
                    className="overflow-hidden"
                  >
                    <p className="px-6 pb-5 text-sm leading-7 text-slate-400">
                      {faq.answer}
                    </p>
                  </motion.div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================
          FINAL CTA
      ===================================================== */}

      <section
        id="contact"
        className="relative overflow-hidden py-28 sm:py-36"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_78%_50%,rgba(99,102,241,0.1),transparent_40%)]" />

        <div className="melvorix-container relative grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
              07 / Ready to Start Your Journey?
            </span>

            <h2 className="mt-6 font-display text-4xl font-semibold leading-[1.1] tracking-[-0.03em] sm:text-5xl lg:text-6xl">
              The future belongs to{" "}
              <span className="melvorix-gradient-text">
                builders.
              </span>
              <br />
              Be one of them.
            </h2>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <a
                href="#academy"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-indigo-500 px-6 text-sm font-semibold text-white shadow-[0_0_40px_rgba(99,102,241,0.22)] transition hover:bg-indigo-400"
              >
                Get Started Now
                <ArrowRight size={16} />
              </a>

              <a
                href="mailto:hello@melvorix.com"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/[0.03] px-6 text-sm font-semibold text-slate-200 transition hover:bg-white/[0.06]"
              >
                <MessageCircle size={16} />
                Talk to Us
              </a>
            </div>
          </div>

          <div className="relative mx-auto flex h-[280px] w-[280px] items-center justify-center sm:h-[340px] sm:w-[340px]">
            <span className="absolute inset-0 rounded-full border border-indigo-400/15" />

            <span className="absolute inset-8 rounded-full border border-indigo-400/10" />

            <span className="absolute inset-16 rounded-full border border-cyan-400/10" />

            <div className="absolute h-40 w-40 rounded-full bg-indigo-500/20 blur-[70px]" />

            <div className="relative flex h-28 w-28 items-center justify-center sm:h-32 sm:w-32">
  {/* Soft brand glow behind the logo */}
  <div className="absolute inset-0 rounded-full bg-cyan-400/20 blur-3xl" />

  <motion.div
    animate={
      shouldReduceMotion
        ? undefined
        : {
            y: [0, -6, 0],
            scale: [1, 1.025, 1],
          }
    }
    transition={
      shouldReduceMotion
        ? undefined
        : {
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }
    }
    className="relative z-10"
  >
    <Image
      src="/melvorix-mark.png"
      alt="Melvorix"
      width={120}
      height={120}
      priority
      className="h-24 w-24 object-contain drop-shadow-[0_0_25px_rgba(0,174,255,0.35)] sm:h-28 sm:w-28"
    />
  </motion.div>
</div>
          </div>
        </div>
      </section>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <footer className="border-t border-white/[0.06] bg-[#080B12]">
        <div className="melvorix-container py-16">
          <div className="grid gap-12 lg:grid-cols-[1.2fr_0.85fr_0.85fr_0.85fr_0.85fr_1.05fr]">
            {/* BRAND */}

            <div>
              <div className="flex items-center gap-2.5">
               
<div className="relative flex h-16 w-16 -translate-y-4 items-center justify-center sm:h-20 sm:w-20">
  <Image
    src="/melvorix-mark.png"
    alt="Melvorix"
    width={80}
    height={80}
    priority
    className="h-14 w-14 object-contain sm:h-16 sm:w-16"
  />
</div>



                {/* <span className="font-display text-lg font-bold tracking-[0.1em] text-white">
                  MELVORIX
                </span> */}
              </div>

              <p className="mt-2 text-[10px] font-medium uppercase tracking-[0.2em] text-slate-600">
                {siteConfig.tagline}
              </p>

              <p className="mt-5 max-w-xs text-sm leading-7 text-slate-600">
                Tech academy and software studio empowering the next
                generation of builders and innovators.
              </p>

              <div className="mt-6 flex gap-3">
                {["FB", "TW", "IN", "IG", "YT"].map(
                  (label) => (
                    <a
                      key={label}
                      href="#"
                      aria-label={label}
                      className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/[0.07] text-[10px] font-semibold text-slate-500 transition hover:border-white/15 hover:text-white"
                    >
                      {label}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* ACADEMY */}

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Academy
              </h3>

              <div className="mt-5 space-y-3">
                {siteConfig.footer.academy.map(
                  (item) => (
                    <a
                      key={item}
                      href="#academy"
                      className="block text-sm text-slate-600 transition hover:text-white"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* STUDIO */}

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Studio
              </h3>

              <div className="mt-5 space-y-3">
                {siteConfig.footer.studio.map(
                  (item) => (
                    <a
                      key={item}
                      href="#studio"
                      className="block text-sm text-slate-600 transition hover:text-white"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* COMPANY */}

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Company
              </h3>

              <div className="mt-5 space-y-3">
                {siteConfig.footer.company.map(
                  (item) => (
                    <a
                      key={item}
                      href="#about"
                      className="block text-sm text-slate-600 transition hover:text-white"
                    >
                      {item}
                    </a>
                  ),
                )}
              </div>
            </div>

            {/* SUPPORT */}

            <div>
              <h3 className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">
                Support
              </h3>

              <div className="mt-5 space-y-3">
                {siteConfig.footer.support.map(
                  (item) => (
                    <a
                      key={item}
                      href={
                        item === "FAQ"
                          ? "#faq"
                          : "#contact"
                      }
                      className="block text-sm text-slate-600 transition hover:text-white"
                    >
                      {item}
                    </a>
                  ),
                )}
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

              <form
                onSubmit={(e) => e.preventDefault()}
                className="mt-4 flex items-center gap-2 rounded-xl border border-white/[0.08] bg-white/[0.03] p-1.5"
              >
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  className="h-9 w-full bg-transparent px-2.5 text-sm text-white placeholder:text-slate-600 focus:outline-none"
                />

                <button
                  type="submit"
                  aria-label="Subscribe"
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-indigo-500 text-white transition hover:bg-indigo-400"
                >
                  <Send size={14} />
                </button>
              </form>
            </div>
          </div>

          {/* COPYRIGHT */}

          <div className="mt-14 flex flex-col justify-between gap-4 border-t border-white/[0.06] pt-6 text-xs text-slate-700 sm:flex-row">
            <span>
              &copy; {new Date().getFullYear()} Melvorix. All rights reserved.
            </span>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-slate-400"
              >
                Privacy Policy
              </a>

              <a
                href="#"
                className="transition hover:text-slate-400"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>
    </main>
  );
}
