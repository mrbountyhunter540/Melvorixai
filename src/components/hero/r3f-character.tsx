"use client";

import { Float } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";

import type { HandSide } from "./types";

interface R3FCharacterProps {
  mode: "wave" | "present";
  hand: HandSide;
}

function CharacterHead() {
  return (
    <group position={[0, 1.9, 0]}>
      <mesh castShadow>
        <sphereGeometry args={[0.34, 32, 32]} />

        <meshStandardMaterial
          color="#d7dbea"
          metalness={0.15}
          roughness={0.35}
        />
      </mesh>

      <mesh position={[0, 0, 0.32]}>
        <boxGeometry args={[0.42, 0.12, 0.04]} />

        <meshStandardMaterial
          color="#111827"
          metalness={0.6}
          roughness={0.2}
          emissive="#172554"
          emissiveIntensity={0.5}
        />
      </mesh>
    </group>
  );
}

function CharacterBody() {
  return (
    <group position={[0, 0.85, 0]}>
      <mesh castShadow>
        <capsuleGeometry
          args={[0.46, 0.95, 8, 24]}
        />

        <meshStandardMaterial
          color="#111827"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      <mesh position={[0, 0.1, 0.47]}>
        <circleGeometry args={[0.17, 32]} />

        <meshStandardMaterial
          color="#6366f1"
          emissive="#6366f1"
          emissiveIntensity={1.5}
          toneMapped={false}
        />
      </mesh>
    </group>
  );
}

function CharacterArm({
  side,
  raised,
}: {
  side: HandSide;
  raised: boolean;
}) {
  const ref = useRef<THREE.Group>(null);

  const direction = side === "left" ? -1 : 1;

  useFrame(() => {
    if (!ref.current) return;

    const targetRotation = raised
      ? direction * -0.9
      : direction * 0.18;

    ref.current.rotation.z = THREE.MathUtils.lerp(
      ref.current.rotation.z,
      targetRotation,
      0.08
    );
  });

  return (
    <group
      ref={ref}
      position={[direction * 0.43, 1.1, 0]}
    >
      <mesh castShadow>
        <capsuleGeometry
          args={[0.12, 0.7, 8, 16]}
        />

        <meshStandardMaterial
          color="#1e293b"
          metalness={0.65}
          roughness={0.3}
        />
      </mesh>

      <mesh
        position={[
          direction * 0.12,
          0.42,
          0,
        ]}
      >
        <sphereGeometry args={[0.16, 24, 24]} />

        <meshStandardMaterial
          color="#6366f1"
          emissive="#312e81"
          emissiveIntensity={0.6}
          metalness={0.4}
          roughness={0.25}
        />
      </mesh>
    </group>
  );
}

function CharacterLeg({
  side,
}: {
  side: HandSide;
}) {
  const direction = side === "left" ? -1 : 1;

  return (
    <mesh
      position={[
        direction * 0.19,
        -0.05,
        0,
      ]}
      castShadow
    >
      <capsuleGeometry
        args={[0.13, 0.75, 8, 16]}
      />

      <meshStandardMaterial
        color="#0f172a"
        metalness={0.7}
        roughness={0.3}
      />
    </mesh>
  );
}

export function R3FCharacter({
  mode,
  hand,
}: R3FCharacterProps) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!groupRef.current) return;

    const time = state.clock.elapsedTime;

    groupRef.current.position.y =
      Math.sin(time * 1.3) * 0.025;

    groupRef.current.rotation.y =
      Math.sin(time * 0.45) * 0.025;
  });

  return (
    <Float
      speed={1.1}
      rotationIntensity={0.05}
      floatIntensity={0.15}
    >
      <group ref={groupRef}>
        <CharacterHead />

        <CharacterBody />

        <CharacterArm
          side="left"
          raised={
            mode === "present" &&
            hand === "left"
          }
        />

        <CharacterArm
          side="right"
          raised={
            mode === "present" &&
            hand === "right"
          }
        />

        <CharacterLeg side="left" />
        <CharacterLeg side="right" />
      </group>
    </Float>
  );
}