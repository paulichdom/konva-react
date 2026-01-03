import { useMachine } from "@xstate/react"
import { toggleMachine } from "./toggleMachine";

export const ToggleComponent = () => {
  const [state, send] = useMachine(toggleMachine, { input: { maxCount: 10 } });
  const stateValue = state.value
  const count = state.context.count

  return (
    <div>
      <div>Value: {stateValue.toString()}</div>
      <div>Context: {count}</div>
      <button
        onClick={() => send({ type: 'toggle' })}
      >
        Toggle
      </button>
    </div>
  )
}
