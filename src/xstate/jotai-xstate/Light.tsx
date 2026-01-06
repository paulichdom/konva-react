import { createMachine } from "xstate"
import { atomWithMachine } from "jotai-xstate"
import { createBrowserInspector } from '@statelyai/inspect';
import { useAtom } from "jotai"

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
      <text x={100} y={20}>
        {state.value as string}
      </text>
    </svg>
  )
}
