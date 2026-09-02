export type HandSide = "left" | "right";

export type CharacterMode = "wave" | "present";

export interface HeroCourse {
  id: string;
  title: string;
  description: string;
  price?: string;
  accent: "indigo" | "cyan";
}

export interface CharacterAnchor {
  x: number;
  y: number;
}

export interface CharacterState {
  mode: CharacterMode;
  hand: HandSide;
}