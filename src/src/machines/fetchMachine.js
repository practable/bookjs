import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/vue";

const fetchMachine = createMachine({
  id: "fetch",
  initial: "idle",
  context: {
    data: undefined,
    error: undefined,
  },
  states: {
    idle: {
      on: { FETCH: "loading" },
    },
    loading: {
      invoke: {
        src: "fetchData",
        onDone: {
          target: "success",
          actions: assign({
            data: (_context, event) => event.data,
          }),
        },
        onError: {
          target: "failure",
          actions: assign({
            error: (_context, event) => event.data,
          }),
        },
      },
    },
    success: {
      entry: "notifySuccess",
      type: "final",
    },
    failure: {
      on: {
        RETRY: "loading",
      },
    },
  },
});

export default {
  props: {
    onResolve: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { state, send } = useMachine(fetchMachine, {
      actions: {
        notifySuccess: (ctx) => props.onResolve(ctx.data),
      },
      services: {
        fetchData: (_context, event) =>
          fetch(
            import.meta.env.VITE_APP_BOOK_SERVER + `/api/v1/${event.query}`
          ).then((res) => res.json()),
      },
    });
    return {
      state,
      send,
    };
  },
};
