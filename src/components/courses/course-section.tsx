"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const courses = [
  {
    id: "ai-automation",
    number: "01",
    category: "Artificial Intelligence",
    title: "AI Automation",
    description:
      "Build intelligent workflows, AI agents, and automation systems that connect modern business operations.",
    status: "Coming Soon",
  },
  {
    id: "data-analytics",
    number: "02",
    category: "Data",
    title: "Data Analytics",
    description:
      "Turn raw information into useful insights through analytics, visualization, and modern data workflows.",
    status: "Coming Soon",
  },
  {
    id: "cybersecurity",
    number: "03",
    category: "Security",
    title: "Cybersecurity",
    description:
      "Understand modern security principles, defensive systems, and the technologies protecting digital infrastructure.",
    status: "Coming Soon",
  },
  {
    id: "web-development",
    number: "04",
    category: "Engineering",
    title: "Modern Web Development",
    description:
      "Design and build production-ready digital experiences with modern frontend and backend technologies.",
    status: "Coming Soon",
  },
];

export function CoursesSection() {
  return (
    <section
      id="courses"
      className="
        relative
        overflow-hidden
        border-t
        border-white/[0.05]
        bg-[#0B0F19]
        py-28
        sm:py-36
      "
    >
      {/* Background glow */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-[-200px]
          top-[20%]
          h-[500px]
          w-[500px]
          rounded-full
          bg-indigo-500/[0.04]
          blur-[120px]
        "
      />

      <div className="melvorix-container relative">
        {/* =================================================
            SECTION HEADER
            ================================================= */}

        <div className="max-w-3xl">
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-indigo-400">
            01 / Education
          </span>

          <h2
            className="
              mt-5
              font-display
              text-4xl
              font-semibold
              leading-tight
              tracking-[-0.04em]
              text-white
              sm:text-5xl
              lg:text-6xl
            "
          >
            Learn skills that move with the industry.
          </h2>

          <p
            className="
              mt-6
              max-w-2xl
              text-base
              leading-8
              text-slate-400
              sm:text-lg
            "
          >
            Practical courses built around modern technologies,
            real workflows, and skills you can actually use.
          </p>
        </div>

        {/* =================================================
            CHARACTER + COURSES STAGE
            ================================================= */}

        <div
          className="
            relative
            mt-20
            min-h-[620px]
            overflow-hidden
            rounded-[2rem]
            border
            border-white/[0.07]
            bg-[#0D121E]
          "
        >
          {/* Ambient stage glow */}

          <div
            aria-hidden="true"
            className="
              absolute
              left-1/2
              top-1/2
              h-[500px]
              w-[500px]
              -translate-x-1/2
              -translate-y-1/2
              rounded-full
              bg-indigo-500/[0.055]
              blur-[120px]
            "
          />

          {/* =================================================
              CHARACTER
              ================================================= */}

          <div
            className="
              pointer-events-none
              absolute
              bottom-0
              left-1/2
              z-10
              h-[480px]
              w-[420px]
              -translate-x-1/2
              sm:h-[540px]
              sm:w-[480px]
            "
          >
            {/* Character placeholder for now */}

            <div
              className="
                absolute
                inset-x-0
                bottom-0
                h-full
              "
            >
              <div
                className="
                  absolute
                  bottom-0
                  left-1/2
                  h-[390px]
                  w-[250px]
                  -translate-x-1/2
                  rounded-[45%]
                  bg-gradient-to-t
                  from-slate-900
                  via-slate-800
                  to-slate-700
                  opacity-70
                  blur-[0.5px]
                "
              />

              <div
                className="
                  absolute
                  bottom-[310px]
                  left-1/2
                  h-28
                  w-28
                  -translate-x-1/2
                  rounded-full
                  bg-slate-300
                  opacity-80
                "
              />
            </div>
          </div>

          {/* =================================================
              COURSE CARDS
              ================================================= */}

          <div
            className="
              relative
              z-20
              grid
              gap-4
              p-5
              sm:grid-cols-2
              sm:p-7
              lg:grid-cols-2
              lg:p-10
            "
          >
            {courses.map((course, index) => (
              <motion.article
                key={course.id}
                initial={{
                  opacity: 0,
                  y: 24,
                }}
                whileInView={{
                  opacity: 1,
                  y: 0,
                }}
                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                transition={{
                  duration: 0.55,
                  delay: index * 0.08,
                }}
                className={`
                  group
                  relative
                  rounded-2xl
                  border
                  border-white/[0.08]
                  bg-[#111725]/90
                  p-6
                  backdrop-blur-xl
                  transition-all
                  duration-500
                  hover:-translate-y-1
                  hover:border-indigo-400/20
                  hover:bg-[#141B2A]
                  ${
                    index === 0
                      ? "lg:mr-[35%]"
                      : ""
                  }
                  ${
                    index === 1
                      ? "lg:ml-[35%]"
                      : ""
                  }
                  ${
                    index === 2
                      ? "lg:mr-[35%]"
                      : ""
                  }
                  ${
                    index === 3
                      ? "lg:ml-[35%]"
                      : ""
                  }
                `}
              >
                {/* Number */}

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.2em] text-slate-600">
                    {course.number}
                  </span>

                  <ArrowUpRight
                    size={17}
                    className="
                      text-slate-600
                      transition-all
                      duration-300
                      group-hover:-translate-y-0.5
                      group-hover:translate-x-0.5
                      group-hover:text-indigo-400
                    "
                  />
                </div>

                {/* Category */}

                <div className="mt-7">
                  <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-indigo-400">
                    {course.category}
                  </span>
                </div>

                {/* Title */}

                <h3
                  className="
                    mt-3
                    font-display
                    text-2xl
                    font-semibold
                    tracking-tight
                    text-white
                  "
                >
                  {course.title}
                </h3>

                {/* Description */}

                <p
                  className="
                    mt-3
                    max-w-md
                    text-sm
                    leading-7
                    text-slate-400
                  "
                >
                  {course.description}
                </p>

                {/* Footer */}

                <div
                  className="
                    mt-7
                    flex
                    items-center
                    justify-between
                    border-t
                    border-white/[0.06]
                    pt-4
                  "
                >
                  <span className="text-xs text-slate-600">
                    {course.status}
                  </span>

                  <button
                    type="button"
                    className="
                      rounded-lg
                      bg-white/[0.04]
                      px-3
                      py-2
                      text-xs
                      font-semibold
                      text-slate-300
                      transition-colors
                      hover:bg-indigo-500
                      hover:text-white
                    "
                  >
                    Explore
                  </button>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}