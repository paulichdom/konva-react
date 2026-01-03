import { setup, assign, createActor } from "xstate";

export const toggleMachine = setup({
  types: {
    context: {} as {
      count: number
      maxCount: number
    },
    input: {} as {
      maxCount: number
    }
  }
}).createMachine({
  id: 'toggle',
  context: ({ input }) => ({
    count: 0,
    maxCount: input.maxCount
  }),
  initial: 'Inactive',
  states: {
    Inactive: {
      on: {
        toggle: {
          // Only trigger toggle transition if count is less than maxCount
          guard: ({ context }) => context.count < context.maxCount,
          target: 'Active'
        }
      },
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

const actor = createActor(toggleMachine, {
  input: { maxCount: 10 }
});

actor.subscribe((snapshot) => {
  console.log('Value:', snapshot.value)
})

actor.start();

