"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

import type { HeroCourse } from "./types";

interface CourseCardProps {
  course: HeroCourse;
  direction: "left" | "right";
}

export function CourseCard({
  course,
  direction,
}: CourseCardProps) {
  return (
    <motion.div
      key={course.id}
      initial={{
        opacity: 0,
        scale: 0.82,
        x: direction === "left" ? 40 : -40,
        y: 20,
      }}
      animate={{
        opacity: 1,
        scale: 1,
        x: 0,
        y: 0,
      }}
      exit={{
        opacity: 0,
        scale: 0.78,
        x: direction === "left" ? -50 : 50,
        y: 20,
      }}
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
      className="
        w-[280px]
        rounded-2xl
        border
        border-white/10
        bg-[#111725]/90
        p-5
        shadow-[0_25px_80px_rgba(0,0,0,0.45)]
        backdrop-blur-xl
        sm:w-[310px]
      "
    >
      <div className="flex items-center justify-between">
        <span
          className={`
            rounded-full
            px-2.5
            py-1
            text-[10px]
            font-semibold
            uppercase
            tracking-[0.15em]
            ${
              course.accent === "cyan"
                ? "bg-cyan-400/10 text-cyan-300"
                : "bg-indigo-400/10 text-indigo-300"
            }
          `}
        >
          Course
        </span>

        <ArrowUpRight
          size={16}
          className="text-slate-500"
        />
      </div>

      <h3 className="mt-5 font-display text-xl font-semibold tracking-tight text-white">
        {course.title}
      </h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {course.description}
      </p>

      <div className="mt-5 flex items-center justify-between">
        <span className="text-sm font-medium text-slate-500">
          Coming soon
        </span>

        <button
          type="button"
          className="
            rounded-lg
            bg-white/[0.06]
            px-3
            py-2
            text-xs
            font-semibold
            text-white
            transition-colors
            hover:bg-indigo-500
          "
        >
          Explore
        </button>
      </div>
    </motion.div>
  );
}