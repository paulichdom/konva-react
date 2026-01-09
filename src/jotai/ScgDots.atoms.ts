import { atom } from "jotai";
import type { Point } from "./types";
import { addShapeAtom } from "./SvgShape";

export const dotsAtom = atom<readonly Point[]>([])

export const addDotAtom = atom(
  null,
  (_get, set, update: Point) => {
    set(dotsAtom, (prev) => [...prev, update])
  }
)

export const commitDotsAtom = atom(
  null,
  (get, set) => {
    set(addShapeAtom, get(dotsAtom));
    set(dotsAtom, []);
  }
)