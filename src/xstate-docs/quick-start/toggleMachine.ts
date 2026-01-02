import { createActor, createMachine } from "xstate";

export const toggleMachine = createMachine({
  id: 'toggle',
  initial: 'Inactive',
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      on: { toggle: 'Inactive' }
    }
  }
})

const actor = createActor(toggleMachine);

actor.subscribe((snapshot) => {
  console.log('Value:', snapshot.value)
})

actor.start();

