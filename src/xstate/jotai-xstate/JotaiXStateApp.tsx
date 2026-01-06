import { Suspense } from "react";
import { createMachine } from "xstate"
import { atomWithMachine } from "jotai-xstate"
import { createBrowserInspector } from '@statelyai/inspect';
import { atom, useAtom, Provider } from "jotai"

const { inspect } = createBrowserInspector({
  iframe: document.getElementById('inspector-iframe') as HTMLIFrameElement | null
});

const lightMachine = createMachine({
  id: 'light',
  initial: 'green',
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

const lightAtom = atomWithMachine(lightMachine, {
  inspect
});

const fetchLightMessage = async (light: string) => {
  await new Promise((r) => setTimeout(r, 1500))
  return `Hello ${light}`
}

const asyncMessageAtom = atom(async (get) => {
  const light = get(lightAtom).value
  const message = await fetchLightMessage(light as string);
  return message
})

const LightMessage = () => {
  const [message] = useAtom(asyncMessageAtom)

  return (
    <text x={100} y={20}>
      {message}
    </text>
  )
}

export const JotaiXStateApp = () => {
  return (
    <>
      <div>
        <Provider>
          <Light />
          <Light />
        </Provider>
      </div>
      <div>
        <Provider>
          <Light />
          <Light />
        </Provider>
      </div>
    </>
  )
}

export const Light = () => {
  const [state, send] = useAtom(lightAtom);

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
