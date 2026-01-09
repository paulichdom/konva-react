import { atom, useAtom } from "jotai";

const countAtom1 = atom(0);
const countAtom2 = atom(0);

export const Counter1 = () => {
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

export const Counter2 = () => {
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