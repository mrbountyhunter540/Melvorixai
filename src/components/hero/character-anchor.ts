import type { CharacterAnchor, HandSide } from "./types";

/**
 * Normalized anchor positions.
 *
 * These values intentionally aren't viewport pixels.
 * They represent positions inside the character stage:
 *
 * x: 0 → 1
 * y: 0 → 1
 *
 * A future GLB character can replace these with
 * actual hand-anchor projection coordinates.
 */

export const CHARACTER_ANCHORS: Record<
  HandSide,
  CharacterAnchor
> = {
  left: {
    x: 0.16,
    y: 0.34,
  },

  right: {
    x: 0.84,
    y: 0.34,
  },
};

export function getCharacterAnchor(
  hand: HandSide
): CharacterAnchor {
  return CHARACTER_ANCHORS[hand];
}