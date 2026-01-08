import { atom, useAtom } from 'jotai'

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

const SvgRoot = () => {
  const [, setDots] = useAtom(dotsAtom)
  return (
    <svg
      width='200'
      height='200'
      viewBox='0 0 200 200'
      onMouseMove={(event) => {
        const point: Point = [event.clientX, event.clientY]
        setDots((prev) => [...prev, point])
      }}
    >
      <rect width='200' height='200' fill="#eee" />
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

