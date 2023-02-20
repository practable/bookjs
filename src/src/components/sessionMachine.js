import { assign, createMachine } from "xstate";
import fetchMachine from "./fetchMachine.js";

export default createMachine({
  id: "sessionMachine",
  initial: "login",
  context: {
    session: "", //basically a userName. must be set by caller
    token: "",
    bookings: {},
  },
  predictableActionArguments: true,
  states: {
    login: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/login/" +
            context.session,
          method: "POST",
        },

        devTools: true,
        onDone: {
          target: "bookings",
          actions: assign({
            token: (context, event) => {
              return event.data.results.token;
            },
          }),
        },
        onError: {},
      },
    },
    bookings: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.session +
            "/bookings",
          method: "GET",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "done",
          actions: assign({
            bookings: (context, event) => {
              //console.log("sessionMachine raw", event);
              if (event.data.status == 200) {
                return event.data.results;
              } else {
                return [];
              }
            },
          }),
        },
        onError: {
          target: "done",
        },
      },
    },
    done: {
      type: "final",
      data: (context, event) => ({
        session: context.session,
        bookings: context.bookings,
      }),
    },
  },
});
