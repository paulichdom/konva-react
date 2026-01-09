import { atom, useAtom } from "jotai";
import type { Point } from "./types";
import { SvgDots } from "./SvgDots";
import { SvgShape } from "./SvgShape";
import { addDotAtom, commitDotsAtom } from "./ScgDots.atoms";

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (_get, set) => {
  set(drawingAtom, true)
})

const handleMouseUpAtom = atom(null, (_get, set) => {
  set(drawingAtom, false)
  set(commitDotsAtom);
})

const handleMouseMoveAtom = atom(
  null,
  (get, set, update: Point) => {
    if (get(drawingAtom)) {
      set(addDotAtom, update)
    }
  }
)

export const SvgRoot = () => {
  const [, handleMouseDown] = useAtom(handleMouseDownAtom);
  const [, handleMouseUp] = useAtom(handleMouseUpAtom);
  const [, handleMouseMove] = useAtom(handleMouseMoveAtom);
  return (
    <svg
      width='200'
      height='200'
      viewBox='0 0 200 200'
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onMouseMove={(event) => {
        handleMouseMove([event.clientX, event.clientY])
      }}
    >
      <rect width='200' height='200' fill="#eee" />
      <SvgShape />
      <SvgDots />
    </svg>
  )
}

