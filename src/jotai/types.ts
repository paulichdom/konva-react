import type { PrimitiveAtom } from "jotai";

export type Point = [number, number];

export type ShapeAtom = PrimitiveAtom<{ path: string }>