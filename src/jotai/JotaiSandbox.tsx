import React, { useState } from 'react'
import { atom, useAtom } from 'jotai'

export const JotaiSandbox = () => {
  return (
    <div>
      <Counter1 />
      <Counter2 />
    </div>
  )
}

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

