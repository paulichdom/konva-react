import { Suspense, useEffect } from "react";
import { createMachine } from "xstate"
import { atomWithMachine } from "jotai-xstate"
import { createBrowserInspector } from '@statelyai/inspect';
import { atom, useAtom, Provider, createStore } from "jotai"
import type { Atom } from "jotai";

const { inspect } = createBrowserInspector({
  iframe: document.getElementById('inspector-iframe') as HTMLIFrameElement | null
});

const initialLightAtom = atom("green")

const createLightMachine = (initial: string) => createMachine({
  id: 'light',
  initial,
  states: {
    green: {
      on: { NEXT: 'yellow' }
    },
    yellow: {
      on: { NEXT: 'red' }
    },
    red: {
      on: { NEXT: 'green' }
    }
  }
})

const createLightAtom = (initial: Atom<string>) => atomWithMachine(
  (get) => createLightMachine(get(initial)),
  {
    inspect
  }
);

const lightAtomAtom = atom(createLightAtom(atom('green')))

const fetchLightMessage = async (light: string) => {
  await new Promise((r) => setTimeout(r, 1500))
  return `Hello ${light}`
}

const asyncMessageAtom = atom(async (get) => {
  const lightAtom = get(lightAtomAtom)
  const light = get(lightAtom).value
  const message = await fetchLightMessage(light as string);
  return message
})

export const JotaiXStateApp = () => {
  const store1 = createStore()
  store1.set(initialLightAtom, "yellow")

  const store2 = createStore()
  store2.set(initialLightAtom, "red")

  return (
    <>
      <div>
        <Provider store={store1}>
          <Light initial={atom('yellow')} />
        </Provider>
      </div>
      <div>
        <Provider store={store2}>
          <Light initial={atom('red')} />
        </Provider>
      </div>
    </>
  )
}

export const Light = ({ initial }: { initial: Atom<string> }) => {
  const [lightAtom, setLightAtom] = useAtom(lightAtomAtom)
  const [state, send] = useAtom(lightAtom);

  useEffect(() => {
    setLightAtom(createLightAtom(initial))
  }, [initial, setLightAtom])

  const handleClick = () => {
    send({ type: 'NEXT' })
  }
  return (
    <svg width={200} height={200}>
      <circle
        fill={state.value as string}
        onClick={handleClick}
        r={40}
        cx={40}
        cy={40}
      />
      <Suspense fallback={<Loader />}>
        <LightMessage />
      </Suspense>
    </svg>
  )
}

const LightMessage = () => {
  const [message] = useAtom(asyncMessageAtom)

  return (
    <text x={100} y={20}>
      {message}
    </text>
  )
}

const Loader = () => (
  <g>
    <circle fill="gray" cx={110} cy={15}>
      <animate
        attributeName="r"
        values="2;8;2"
        dur='800ms'
        repeatCount="indefinite"
      />
    </circle>
    <text x={130} y={20} textAnchor="start" fill="black">
      Loading...
    </text>
  </g>
)
