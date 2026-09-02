"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

import type { HandSide } from "./types";

interface CharacterStageProps {
  mode: "wave" | "present";
  hand: HandSide;
  priority?: boolean;
}

/**
 * Static render poses for the Melvorix mascot.
 *
 * These are the approved character sheets — used as-is, no
 * procedural geometry, no idle motion loop. The character
 * settles into frame once on mount and then holds still —
 * only the content around it (course cards, copy) changes.
 */

const POSES: Record<
  CharacterStageProps["mode"],
  { src: string; alt: string }
> = {
  wave: {
    src: "/images/character/melvorix-wave.png",
    alt: "Melvorix mascot in a glowing tech hoodie and coat, waving hello",
  },

  present: {
    src: "/images/character/melvorix-present.png",
    alt: "Melvorix mascot in a glowing tech coat, presenting on a laptop",
  },
};

export function CharacterStage({
  mode,
  hand,
  priority = false,
}: CharacterStageProps) {
  const shouldReduceMotion = useReducedMotion();
  const pose = POSES[mode];
  const mirrored = hand === "left";

  return (
    <div className="pointer-events-none absolute inset-0 flex items-end justify-center overflow-visible">
      <motion.div
        initial={
          shouldReduceMotion
            ? false
            : { opacity: 0, y: 18, scale: 0.97 }
        }
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative h-full w-full max-w-[300px] sm:max-w-[380px] lg:max-w-[440px]"
        style={{ transform: mirrored ? "scaleX(-1)" : undefined }}
      >
        <Image
          src={pose.src}
          alt={pose.alt}
          fill
          priority={priority}
          sizes="(min-width: 1024px) 440px, (min-width: 640px) 380px, 300px"
          className="object-contain object-bottom [filter:drop-shadow(0_35px_45px_rgba(0,0,0,0.55))_drop-shadow(0_0_60px_rgba(99,102,241,0.16))]"
        />
      </motion.div>
    </div>
  );
}