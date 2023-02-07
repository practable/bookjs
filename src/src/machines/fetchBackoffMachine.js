import { assign, createMachine } from "xstate";
import { useMachine } from "@xstate/vue";

// Modified from https://gist.github.com/avanslaars/2e4edd86ae71c4c7cf23719b1cb67c9e
const fetchBackoffMachine = createMachine(
  {
    id: "fetch",
    initial: "idle",
    context: {
      path: import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/unique",
      method: "POST",
      token: "",
      results: [],
      retryCount: 0,
    },
    states: {
      idle: {
        on: {
          FETCH: "loading",
        },
      },
      loading: {
        invoke: {
          src: "fetchData",
          onDone: { target: "success", actions: "handleData" },
          onError: { target: "failure" },
        },
        on: {
          RESOLVE: "success",
          REJECT: "failure",
        },
      },
      success: {
        entry: "notifySuccess",
        type: "final",
      },
      failure: {
        on: {
          "": [
            {
              target: "awaitingRetry",
              actions: "incRetry",
              cond: "withinLimit",
            },
            { target: "terminated" },
          ],
        },
      },
      awaitingRetry: {
        after: {
          FETCH_DELAY: "loading",
        },
      },
      terminated: {},
    },
  },
  {
    services: {
      loadData: (ctx, evt) =>
        new Promise((res, rej) => {
          setTimeout(() => {
            ctx.retryCount > 6 ? res("win") : rej();
          }, 500);
        }),
    },
    guards: {
      withinLimit: (context) => context.retryCount < 5,
    },
    actions: {
      handleData: assign({ results: (_, event) => event.data }),
      incRetry: assign({ retryCount: (context) => context.retryCount + 1 }),
    },
    delays: {
      FETCH_DELAY: (context, event) => Math.pow(2.0, context.retryCount) * 500,
    },
  }
);

export default {
  props: {
    onResolve: {
      type: Function,
      default: () => {},
    },
  },
  setup(props) {
    const { state, send } = useMachine(fetchBackoffMachine, {
      actions: {
        notifySuccess: (ctx) => props.onResolve(ctx.data),
      },
      services: {
        fetchData: (_context, event) =>
          fetch(_context.path, {
            method: _context.method,
            headers: {
              Authorization: _context.token,
            },
          }).then((res) => res.json()),
      },
    });
    return {
      state,
      send,
    };
  },
};
