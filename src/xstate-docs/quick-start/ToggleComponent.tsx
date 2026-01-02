import { useMachine } from "@xstate/react"
import { toggleMachine } from "./toggleMachine";

export const ToggleComponent = () => {
  const [state, send] = useMachine(toggleMachine);
  const stateValue = state.value

  return (
    <div>
      <div>Value: {stateValue.toString()}</div>
      <button
        onClick={() => send({ type: 'toggle' })}
      >
        Toggle
      </button>
    </div>
  )
}
