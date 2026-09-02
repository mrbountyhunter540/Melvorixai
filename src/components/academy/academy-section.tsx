"use client";

import {
  ArrowRight,
  ArrowUpRight,
  Check,
  Database,
  Globe2,
  Layers3,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import {
  AnimatePresence,
  motion,
  useReducedMotion,
} from "framer-motion";
import { useState } from "react";

import { CharacterStage } from "@/components/hero/character-stage";

type HandSide = "left" | "right";

type AcademyCourse = {
  number: string;
  title: string;
  category: string;
  description: string;
  icon: typeof Workflow;
  accent: "indigo" | "cyan";
  learn: string[];
};

const academyCourses: AcademyCourse[] = [
  {
    number: "01",
    title: "AI Automation",
    category: "AI / AUTOMATION",
    description:
      "Build intelligent agents, automate workflows, connect APIs, and create systems that work while you sleep.",
    icon: Workflow,
    accent: "indigo",
    learn: [
      "AI Agent Development",
      "Workflow Automation",
      "API & Tool Integrations",
      "No-code + Custom Solutions",
    ],
  },
  {
    number: "02",
    title: "Cybersecurity",
    category: "SECURITY",
    description:
      "Learn the foundations of modern cybersecurity, defensive systems, risk, and digital protection.",
    icon: ShieldCheck,
    accent: "cyan",
    learn: [
      "Security Fundamentals",
      "Defensive Systems",
      "Risk & Threat Awareness",
      "Digital Protection",
    ],
  },
  {
    number: "03",
    title: "Digital Marketing",
    category: "GROWTH",
    description:
      "Build modern acquisition systems using content, SEO, paid media, analytics, and automation.",
    icon: Globe2,
    accent: "indigo",
    learn: [
      "Content Systems",
      "SEO Foundations",
      "Paid Media",
      "Marketing Automation",
    ],
  },
  {
    number: "04",
    title: "Social Media",
    category: "CONTENT SYSTEMS",
    description:
      "Learn how to design, automate, manage, and grow professional social media systems.",
    icon: Layers3,
    accent: "cyan",
    learn: [
      "Content Strategy",
      "Social Automation",
      "Audience Growth",
      "Performance Systems",
    ],
  },
  {
    number: "05",
    title: "Data Analytics",
    category: "DATA",
    description:
      "Transform raw information into decisions through analytics, visualization, and data workflows.",
    icon: Database,
    accent: "indigo",
    learn: [
      "Data Workflows",
      "Analytics Foundations",
      "Visualization",
      "Decision Systems",
    ],
  },
];

const stats = [
  {
    label: "PROGRAMS",
    value: "05",
    description: "Industry-focused",
  },
  {
    label: "LEARNING",
    value: "01",
    description: "Project-driven",
  },
  {
    label: "APPROACH",
    value: "02",
    description: "Learn + build",
  },
  {
    label: "FOCUS",
    value: "∞",
    description: "Continuous growth",
  },
];

function FeaturedCourseCard({
  course,
  direction,
  reduceMotion,
}: {
  course: AcademyCourse;
  direction: "left" | "right";
  reduceMotion: boolean;
}) {
  const Icon = course.icon;

  return (
    <motion.article
      initial={
        reduceMotion
          ? false
          : {
              opacity: 0,
              scale: 0.78,
              x: direction === "left" ? 70 : -70,
              y: 45,
              rotateY: direction === "left" ? -10 : 10,
              filter: "blur(8px)",
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
        rotateY: 0,
        filter: "blur(0px)",
      }}
      exit={
        reduceMotion
          ? undefined
          : {
              opacity: 0,
              scale: 0.82,
              x: direction === "left" ? -55 : 55,
              y: -30,
              rotateY: direction === "left" ? 8 : -8,
              filter: "blur(6px)",
            }
      }
      transition={
        reduceMotion
          ? { duration: 0 }
          : {
              type: "spring",
              stiffness: 170,
              damping: 21,
              mass: 0.8,
            }
      }
      className="
        relative
        w-[min(390px,calc(100vw-48px))]
        overflow-hidden
        rounded-[24px]
        border
        border-cyan-300/25
        bg-[#0A1220]/95
        p-6
        shadow-[0_30px_100px_rgba(0,0,0,0.65)]
        backdrop-blur-2xl
        sm:p-7
      "
    >
      {/* animated edge light */}
      <motion.div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          h-px
          bg-gradient-to-r
          from-transparent
          via-cyan-300
          to-transparent
        "
        animate={
          reduceMotion
            ? undefined
            : {
                opacity: [0.25, 1, 0.25],
              }
        }
        transition={
          reduceMotion
            ? undefined
            : {
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
              }
        }
      />

      {/* internal glow */}
      <div
        aria-hidden="true"
        className={`
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-48
          w-48
          rounded-full
          blur-[80px]
          ${
            course.accent === "cyan"
              ? "bg-cyan-400/10"
              : "bg-indigo-500/12"
          }
        `}
      />

      {/* top metadata */}
      <div className="relative flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            className={`
              flex
              h-9
              w-9
              items-center
              justify-center
              rounded-lg
              border
              text-sm
              font-semibold
              ${
                course.accent === "cyan"
                  ? "border-cyan-400/30 bg-cyan-400/[0.08] text-cyan-300"
                  : "border-indigo-400/30 bg-indigo-400/[0.08] text-indigo-300"
              }
            `}
          >
            {course.number}
          </span>

          <span
            className={`
              text-[10px]
              font-semibold
              uppercase
              tracking-[0.18em]
              ${
                course.accent === "cyan"
                  ? "text-cyan-300"
                  : "text-indigo-300"
              }
            `}
          >
            {course.category}
          </span>
        </div>

        <ArrowUpRight
          size={17}
          className="text-slate-500"
        />
      </div>

      {/* title */}
      <h3 className="relative mt-7 font-display text-3xl font-semibold tracking-[-0.035em] text-white sm:text-[34px]">
        {course.title}
      </h3>

      {/* divider */}
      <div
        className={`
          relative
          mt-3
          h-px
          w-24
          ${
            course.accent === "cyan"
              ? "bg-cyan-300/70"
              : "bg-indigo-300/70"
          }
        `}
      />

      {/* description */}
      <p className="relative mt-4 text-sm leading-6 text-slate-300">
        {course.description}
      </p>

      {/* learning list */}
      <div className="relative mt-7">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-cyan-300">
          What you&apos;ll learn
        </span>

        <div className="mt-4 space-y-2.5">
          {course.learn.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm text-slate-300"
            >
              <span
                className={`
                  flex
                  h-4
                  w-4
                  shrink-0
                  items-center
                  justify-center
                  rounded-full
                  border
                  ${
                    course.accent === "cyan"
                      ? "border-cyan-400/60 text-cyan-300"
                      : "border-indigo-400/60 text-indigo-300"
                  }
                `}
              >
                <Check size={10} strokeWidth={2.5} />
              </span>

              {item}
            </div>
          ))}
        </div>
      </div>

      {/* footer */}
      <div className="relative mt-7 flex items-end justify-between border-t border-white/[0.08] pt-5">
        <div>
          <span className="block text-[9px] uppercase tracking-[0.18em] text-slate-600">
            Enrollment
          </span>

          <span className="mt-1 block text-sm font-medium text-slate-400">
            Opening soon
          </span>
        </div>

        <button
          type="button"
          className="
            inline-flex
            items-center
            gap-2
            rounded-xl
            border
            border-cyan-300/20
            bg-cyan-300/[0.08]
            px-4
            py-2.5
            text-xs
            font-semibold
            text-white
            transition-all
            duration-300
            hover:border-cyan-300/40
            hover:bg-cyan-300/[0.16]
          "
        >
          Explore
          <ArrowRight size={14} />
        </button>
      </div>

      {/* technical corner marks */}
      <span
        aria-hidden="true"
        className="absolute bottom-3 left-3 h-2 w-2 border-b border-l border-cyan-300/30"
      />

      <span
        aria-hidden="true"
        className="absolute right-3 top-3 h-2 w-2 border-r border-t border-cyan-300/30"
      />
    </motion.article>
  );
}

export function AcademySection() {
  const reduceMotion = useReducedMotion();
  const [activeCourse, setActiveCourse] = useState(0);

  const course = academyCourses[activeCourse];

  const hand: HandSide =
    activeCourse % 2 === 0 ? "left" : "right";

  const previousCourse = activeCourse === 0
    ? academyCourses.length - 1
    : activeCourse - 1;

  const direction =
    activeCourse >= previousCourse ? "right" : "left";

  return (
    <section
      id="courses"
      className="
        relative
        overflow-hidden
        border-b
        border-white/[0.06]
        bg-[#05080E]
        py-24
        sm:py-32
        lg:py-40
      "
    >
      {/* =====================================================
          BACKGROUND SYSTEM
      ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          opacity-40
          [background-image:linear-gradient(rgba(148,163,184,0.025)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.025)_1px,transparent_1px)]
          [background-size:64px_64px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[15%]
          top-[30%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/[0.06]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          right-[5%]
          top-[15%]
          h-[520px]
          w-[520px]
          rounded-full
          bg-cyan-400/[0.035]
          blur-[150px]
        "
      />

      <div className="melvorix-container relative">
        {/* =================================================
            TOP SYSTEM LABEL
        ================================================= */}

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-mono text-xs text-cyan-400">
              01
            </span>

            <span className="h-px w-12 bg-white/15" />

            <span className="font-mono text-[10px] uppercase tracking-[0.34em] text-slate-400">
              Melvorix Academy
            </span>
          </div>

          <span className="hidden font-mono text-[9px] uppercase tracking-[0.24em] text-slate-600 sm:block">
            Learn. Build. Automate.
          </span>
        </div>

        {/* =================================================
            MAIN COMPOSITION
        ================================================= */}

        <div className="mt-16 grid gap-14 lg:mt-20 lg:grid-cols-[0.86fr_1.14fr] lg:items-center lg:gap-12">
          {/* =================================================
              LEFT — COPY + COURSE NAVIGATION
          ================================================= */}

          <div className="relative z-30">
            <div className="mb-6 flex items-center gap-3">
              <span className="font-mono text-xs text-cyan-400">
                ///
              </span>

              <span className="text-[11px] font-medium uppercase tracking-[0.22em] text-cyan-300">
                Industry-focused courses
              </span>
            </div>

            <h2 className="max-w-xl font-display text-5xl font-semibold leading-[0.96] tracking-[-0.055em] text-white sm:text-6xl lg:text-[68px]">
              Master skills
              <br />
              that shape
              <br />
              <span className="melvorix-gradient-text">
                tomorrow.
              </span>
            </h2>

            <p className="mt-7 max-w-lg text-sm leading-7 text-slate-400 sm:text-base">
              Hands-on learning. Real workflows. Practical
              technology skills designed around the systems
              shaping modern digital work.
            </p>

            {/* course selector */}
            <div className="mt-9 space-y-2">
              {academyCourses.map((item, index) => {
                const Icon = item.icon;
                const active = index === activeCourse;

                return (
                  <button
                    key={item.number}
                    type="button"
                    onClick={() => setActiveCourse(index)}
                    aria-pressed={active}
                    className={`
                      group
                      relative
                      flex
                      w-full
                      items-center
                      gap-4
                      overflow-hidden
                      rounded-xl
                      border
                      px-4
                      py-3.5
                      text-left
                      transition-all
                      duration-300
                      sm:px-5
                      ${
                        active
                          ? "border-cyan-300/30 bg-cyan-300/[0.06]"
                          : "border-white/[0.07] bg-white/[0.015] hover:border-white/[0.14] hover:bg-white/[0.03]"
                      }
                    `}
                  >
                    {/* active beam */}
                    <span
                      className={`
                        absolute
                        left-0
                        top-0
                        h-full
                        w-[2px]
                        transition-all
                        duration-300
                        ${
                          active
                            ? "bg-cyan-300 shadow-[0_0_18px_rgba(103,232,249,0.8)]"
                            : "bg-transparent"
                        }
                      `}
                    />

                    <span
                      className={`
                        w-8
                        shrink-0
                        font-mono
                        text-sm
                        ${
                          active
                            ? "text-cyan-300"
                            : "text-slate-600"
                        }
                      `}
                    >
                      {item.number}
                    </span>

                    <span
                      className={`
                        flex
                        h-10
                        w-10
                        shrink-0
                        items-center
                        justify-center
                        rounded-lg
                        border
                        transition-all
                        duration-300
                        ${
                          active
                            ? "border-cyan-300/30 bg-cyan-300/[0.08] text-cyan-300"
                            : "border-white/[0.08] text-slate-500 group-hover:text-slate-300"
                        }
                      `}
                    >
                      <Icon size={18} strokeWidth={1.7} />
                    </span>

                    <span className="min-w-0 flex-1">
                      <span
                        className={`
                          block
                          text-sm
                          font-medium
                          transition-colors
                          ${
                            active
                              ? "text-white"
                              : "text-slate-300"
                          }
                        `}
                      >
                        {item.title}
                      </span>

                      <span className="mt-0.5 block truncate text-[11px] text-slate-600">
                        {item.category}
                      </span>
                    </span>

                    <ArrowUpRight
                      size={15}
                      className={`
                        shrink-0
                        transition-all
                        duration-300
                        ${
                          active
                            ? "text-cyan-300"
                            : "text-slate-700 group-hover:text-slate-400"
                        }
                      `}
                    />
                  </button>
                );
              })}
            </div>

            <a
              href="#services"
              className="
                mt-7
                inline-flex
                items-center
                gap-3
                text-[11px]
                font-semibold
                uppercase
                tracking-[0.18em]
                text-cyan-300
                transition-colors
                hover:text-white
              "
            >
              Explore the ecosystem
              <ArrowRight size={15} />
            </a>
          </div>

          {/* =================================================
              RIGHT — CHARACTER + HOLOGRAPHIC COURSE
          ================================================= */}

          <div
            className="
              relative
              min-h-[650px]
              overflow-visible
              lg:min-h-[720px]
            "
          >
            {/* stage */}
            <div className="absolute inset-0">
              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-[52%]
                  h-[480px]
                  w-[480px]
                  -translate-x-1/2
                  -translate-y-1/2
                  rounded-full
                  bg-indigo-500/[0.055]
                  blur-[110px]
                "
              />

              <div
                aria-hidden="true"
                className="
                  absolute
                  left-1/2
                  top-[62%]
                  h-[1px]
                  w-[82%]
                  -translate-x-1/2
                  bg-gradient-to-r
                  from-transparent
                  via-cyan-300/20
                  to-transparent
                "
              />

              <CharacterStage
                mode="present"
                hand={hand}
              />
            </div>

            {/* orbit / technical ring */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[52%]
                h-[620px]
                w-[620px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-cyan-300/[0.08]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                left-1/2
                top-[52%]
                h-[500px]
                w-[500px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-indigo-400/[0.06]
              "
            />

            {/* =================================================
                FEATURED CARD
            ================================================= */}

            <div
              className={`
                absolute
                top-[18%]
                z-30
                transition-[left]
                duration-700
                ease-[cubic-bezier(0.22,1,0.36,1)]
                ${
                  hand === "left"
                    ? "left-[0%]"
                    : "left-[47%]"
                }
              `}
            >
              <AnimatePresence
                mode="popLayout"
                initial={false}
              >
                <FeaturedCourseCard
                  key={course.number}
                  course={course}
                  direction={direction}
                  reduceMotion={Boolean(reduceMotion)}
                />
              </AnimatePresence>
            </div>

            {/* hand connection beam */}
            <motion.div
              aria-hidden="true"
              className={`
                pointer-events-none
                absolute
                z-20
                hidden
                h-px
                w-24
                bg-gradient-to-r
                from-transparent
                via-cyan-300/50
                to-cyan-300/10
                lg:block
                ${
                  hand === "left"
                    ? "left-[27%] top-[55%] rotate-[24deg]"
                    : "right-[27%] top-[55%] -rotate-[24deg]"
                }
              `}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      opacity: [0.25, 0.8, 0.25],
                    }
              }
              transition={
                reduceMotion
                  ? undefined
                  : {
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }
              }
            />

            {/* holographic floor */}
            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[4%]
                left-1/2
                h-10
                w-[55%]
                -translate-x-1/2
                rounded-[50%]
                border
                border-cyan-300/15
                bg-cyan-300/[0.025]
                blur-[0.2px]
              "
            />

            <div
              aria-hidden="true"
              className="
                pointer-events-none
                absolute
                bottom-[6%]
                left-1/2
                h-px
                w-[42%]
                -translate-x-1/2
                bg-cyan-300/30
                shadow-[0_0_35px_rgba(103,232,249,0.35)]
              "
            />
          </div>
        </div>

        {/* =================================================
            STATS / CREDIBILITY STRIP
        ================================================= */}

        <div className="mt-10 overflow-hidden rounded-2xl border border-white/[0.07] bg-white/[0.015] lg:mt-4">
          <div className="grid divide-y divide-white/[0.07] sm:grid-cols-2 sm:divide-y-0 lg:grid-cols-4 lg:divide-x">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-4 px-5 py-5 sm:px-6"
              >
                <span className="font-mono text-[10px] text-cyan-300">
                  {stat.label}
                </span>

                <span className="h-7 w-px bg-white/[0.08]" />

                <div>
                  <span className="block font-display text-xl font-semibold text-white">
                    {stat.value}
                  </span>

                  <span className="mt-0.5 block text-[10px] text-slate-600">
                    {stat.description}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}