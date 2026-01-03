import { setup, assign, createActor, createMachine } from "xstate";

export const toggleMachine = setup({
  types: {
    context: {} as {
      count: number
    }
  }
}).createMachine({
  id: 'toggle',
  context: { count: 0 },
  initial: 'Inactive',
  states: {
    Inactive: {
      on: { toggle: "Active" },
    },
    Active: {
      entry: assign({
        count: ({ context }) => context.count + 1
      }),
      on: { toggle: 'Inactive' },
      after: { 2000: 'Inactive' }
    }
  }
})

const actor = createActor(toggleMachine);

actor.subscribe((snapshot) => {
  console.log('Value:', snapshot.value)
})

actor.start();

