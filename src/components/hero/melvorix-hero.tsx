"use client";

import { motion, useReducedMotion } from "framer-motion";

import { CharacterStage } from "./character-stage";

export function MelvorixHero() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section
      className="
        relative
        min-h-screen
        overflow-hidden
        bg-[#0B0F19]
      "
    >
      {/* =====================================================
          AMBIENT BACKGROUND
          ===================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          left-1/2
          top-[15%]
          h-[600px]
          w-[600px]
          -translate-x-1/2
          rounded-full
          bg-indigo-500/[0.07]
          blur-[140px]
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          bottom-[-250px]
          right-[-150px]
          h-[500px]
          w-[500px]
          rounded-full
          bg-cyan-500/[0.035]
          blur-[130px]
        "
      />

      <div
        className="
          melvorix-container
          relative
          flex
          min-h-screen
          items-center
          pt-32
          lg:pt-36
        "
      >
        <div
          className="
            grid
            w-full
            items-center
            gap-10
            lg:grid-cols-[0.9fr_1.1fr]
          "
        >
          {/* =================================================
              HERO COPY
              ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    y: 24,
                  }
            }
            animate={{
              opacity: 1,
              y: 0,
            }}
            transition={{
              duration: 0.8,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              z-10
              max-w-2xl
            "
          >
            {/* Eyebrow */}

            <div
              className="
                mb-7
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-indigo-400/20
                bg-indigo-400/[0.06]
                px-3
                py-1.5
              "
            >
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-400" />

              <span className="text-xs font-medium tracking-wide text-indigo-200">
                Technology. Education. Innovation.
              </span>
            </div>

            {/* Heading */}

            <h1
              className="
                font-display
                text-5xl
                font-semibold
                leading-[1.02]
                tracking-[-0.05em]
                text-white
                sm:text-6xl
                lg:text-7xl
              "
            >
              Build what&apos;s next with{" "}
              <span className="melvorix-gradient-text">
                technology.
              </span>
            </h1>

            {/* Description */}

            <p
              className="
                mt-7
                max-w-xl
                text-base
                leading-8
                text-slate-400
                sm:text-lg
              "
            >
              Learn modern technology through practical
              education, or let our team build intelligent
              digital systems for your business.
            </p>

            {/* CTA */}

            <div
              className="
                mt-9
                flex
                flex-col
                gap-3
                sm:flex-row
              "
            >
              <a
                href="#courses"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  bg-indigo-500
                  px-6
                  text-sm
                  font-semibold
                  text-white
                  shadow-[0_0_40px_rgba(99,102,241,0.18)]
                  transition-all
                  hover:bg-indigo-400
                  hover:shadow-[0_0_50px_rgba(99,102,241,0.28)]
                "
              >
                Explore Courses
              </a>

              <a
                href="#services"
                className="
                  inline-flex
                  h-12
                  items-center
                  justify-center
                  rounded-xl
                  border
                  border-white/10
                  bg-white/[0.03]
                  px-6
                  text-sm
                  font-semibold
                  text-slate-200
                  transition-all
                  hover:bg-white/[0.06]
                  hover:text-white
                "
              >
                Explore Services
              </a>
            </div>

            {/* Small credibility line */}

            <div
              className="
                mt-8
                flex
                items-center
                gap-3
                text-xs
                text-slate-500
              "
            >
              <span className="h-px w-8 bg-white/10" />

              <span>
                Practical technology for the next generation.
              </span>
            </div>
          </motion.div>

          {/* =================================================
              CHARACTER
              ================================================= */}

          <motion.div
            initial={
              shouldReduceMotion
                ? false
                : {
                    opacity: 0,
                    scale: 0.96,
                    y: 20,
                  }
            }
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              delay: shouldReduceMotion ? 0 : 0.15,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="
              relative
              h-[520px]
              w-full
              sm:h-[600px]
              lg:h-[680px]
            "
          >
            {/* Character glow */}

            <div
              aria-hidden="true"
              className="
                absolute
                left-1/2
                top-1/2
                h-[380px]
                w-[380px]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                bg-indigo-500/[0.08]
                blur-[100px]
              "
            />

            <CharacterStage
              mode="wave"
              hand="right"
            />
          </motion.div>
        </div>
      </div>

      {/* =====================================================
          SCROLL INDICATOR
          ===================================================== */}

      <motion.div
        initial={{
          opacity: 0,
        }}
        animate={{
          opacity: 1,
        }}
        transition={{
          delay: shouldReduceMotion ? 0 : 1.4,
          duration: 0.5,
        }}
        className="
          absolute
          bottom-8
          left-1/2
          hidden
          -translate-x-1/2
          flex-col
          items-center
          gap-3
          md:flex
        "
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.3em] text-slate-600">
          Scroll to explore
        </span>

        <span className="h-8 w-px bg-gradient-to-b from-slate-500 to-transparent" />
      </motion.div>
    </section>
  );
}