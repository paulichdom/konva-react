import { atom, useAtom } from 'jotai'
import { useEffect, useRef } from 'react';

export const JotaiSandbox = () => {
  return (
    <div>
      <SvgRoot />
      <Stats />
    </div>
  )
}

// 2. Derive state from Jotai Atom
type Point = [number, number];

const dotsAtom = atom<Point[]>([])

const numberOfDotsAtom = atom(
  (get) => get(dotsAtom).length
)

const drawingAtom = atom(false);

const handleMouseDownAtom = atom(null, (_get, set) => {
  set(drawingAtom, true)
})

const handleMouseUpAtom = atom(null, (_get, set) => {
  set(drawingAtom, false)
})

const handleMouseMoveAtom = atom(
  null,
  (get, set, update: Point) => {
    if (get(drawingAtom)) {
      set(dotsAtom, (prev) => [...prev, update])
    }
  }
)

const SvgDots = () => {
  const [dots] = useAtom(dotsAtom)
  return (
    <g>
      {dots.map(([x, y], index) => (
        <circle key={index} cx={x} cy={y} r='2' fill='#aaa' />
      ))}
    </g>
  )
}

const useCommitCount = () => {
  const commitCountRef = useRef(0);

  useEffect(() => {
    commitCountRef.current += 1;
  })

  return commitCountRef.current
}

const SvgRoot = () => {
  const [, setDots] = useAtom(dotsAtom)
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
      <text x='3' y='12' fontSize='12px'>
        Commits: {useCommitCount()}
      </text>
      <SvgDots />
    </svg>
  )
}

const Stats = () => {
  const [numberOfDots] = useAtom(numberOfDotsAtom);
  return (
    <ul>
      <li>
        Dots: {numberOfDots}
      </li>
    </ul>
  )
}

// 1. Share state between react components

const countAtom1 = atom(0);
const countAtom2 = atom(0);

const Counter1 = () => {
  const [count, setCount] = useAtom(countAtom1);

  return (
    <div style={{ marginBottom: 16 }}>
      {count}
      <button
        onClick={() => setCount((count) => count + 1)}
        style={{ marginLeft: 8 }}
      >
        +1
      </button>
    </div>
  )
}

const Counter2 = () => {
  const [count, setCount] = useAtom(countAtom2);

  return (
    <div>
      {count}
      <button
        onClick={() => setCount((count) => count + 1)}
        style={{ marginLeft: 8 }}
      >
        +1
      </button>
    </div>
  )
}

