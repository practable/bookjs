import { assign, createMachine, interpret, send, sendParent } from "xstate";

const getUserLocally = (context, event) =>
  new Promise((resolve, reject) => {
    var userName = localStorage.getItem("userName", false);
    console.log("userName", userName);
    if (userName == null) {
      return reject("no userName found");
    }
    if (userName == "") {
      return reject("no userName found");
    }

    return resolve({ status: "ok", userName: userName });
  });

const storeUserLocally = (context, event) =>
  new Promise((resolve, reject) => {
    var userName = localStorage.setItem("userName", context.userName);

    console.log("stored userName", context.userName);

    return resolve();
  });

const noContentMachine = createMachine(
  {
    predictableActionArguments: true, //https://xstate.js.org/docs/guides/actions.html
    id: "loginNoContentFetch",
    initial: "loading",
    context: {
      path: import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/", //this routing is incomplete.
      method: "POST",
      token: "",
      retryCount: 0,
    },
    states: {
      loading: {
        invoke: {
          src: "fetchNoData",
          onDone: { target: "success" },
          onError: { target: "failure" },
        },
      },
      success: {
        type: "final",
        data: (context, event) => ({
          results: context.results,
          result: "success",
        }),
      },
      failure: {
        on: {
          always: [
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
      terminated: {
        type: "final",
        data: (context, event) => ({
          results: context.results,
          result: "terminated",
        }),
      },
    },
  },
  {
    services: {
      fetchNoData: (_context, event) =>
        fetch(_context.path, {
          method: _context.method,
          headers: {
            Authorization: _context.token,
          },
        }), //don't process any JSON here, as no content expected
    },
    guards: {
      withinLimit: (context) => context.retryCount < 5,
    },
    actions: {
      incRetry: assign({ retryCount: (context) => context.retryCount + 1 }),
    },
    delays: {
      FETCH_DELAY: (context, event) => Math.pow(2.0, context.retryCount) * 500,
    },
  }
);

const fetchMachine = createMachine(
  {
    predictableActionArguments: true, //https://xstate.js.org/docs/guides/actions.html
    id: "loginFetch",
    initial: "loading",
    context: {
      path: import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/unique",
      method: "POST",
      token: "",
      results: "FOO",
      retryCount: 0,
    },
    states: {
      loading: {
        invoke: {
          src: "fetchData",
          onDone: { target: "success", actions: "handleData" },
          onError: { target: "failure" },
        },
      },
      success: {
        type: "final",
        data: (context, event) => ({
          results: context.results,
          result: "success",
        }),
      },
      failure: {
        on: {
          always: [
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
      terminated: {
        type: "final",
        data: (context, event) => ({
          results: context.results,
          result: "terminated",
        }),
      },
    },
  },
  {
    services: {
      fetchData: (_context, event) =>
        fetch(_context.path, {
          method: _context.method,
          headers: {
            Authorization: _context.token,
          },
        }).then((res) => res.json()),
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

const parentMachine = createMachine({
  id: "loginParent",
  initial: "userLocal",
  context: {
    userLocal: "-",
    userRemote: "-",
    userName: "not known",
    login: "-",
    groups: "-",
    defaultGroup: "g-a",
    defaultGroupAddedStatus: undefined,
  },
  states: {
    userLocal: {
      invoke: {
        src: getUserLocally,
        onDone: {
          target: "login",
          actions: assign({
            userLocal: (context, event) => {
              return event.data;
            },
            userName: (context, event) => {
              return event.data.userName;
            },
          }),
        },
        onError: {
          target: "userRemote",
        },
      },
    },

    userRemote: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/unique",
          method: "POST",
        },
        devTools: true,
        onDone: {
          target: "storeUser",
          actions: assign({
            userRemote: (context, event) => {
              return event.data;
            },
            userName: (context, event) => {
              return event.data.results.user_name;
            },
          }),
        },
        onError: {},
      },
    },

    storeUser: {
      invoke: {
        src: storeUserLocally,
        onDone: {
          target: "login",
        },
        onError: {
          target: "noFuture",
        },
      },
    },

    login: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/login/" +
            context.userName,
          method: "POST",
        },

        devTools: true,
        onDone: {
          target: "addDefaultGroup",
          actions: assign({
            login: (context, event) => {
              return event.data;
            },
            token: (context, event) => {
              return event.data.results.token;
            },
          }),
        },
        onError: {},
      },
    },
    groups: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/groups",
          method: "GET",
          token: (context, event) => context.token,
        },
        devTools: true,
        onDone: {
          target: "loginDone",
          actions: assign({
            groups: (context, event) => {
              return event.data.results.groups;
            },
          }),
        },
        onError: {
          target: "addDefaultGroup",
        },
      },
    },
    addDefaultGroup: {
      invoke: {
        src: noContentMachine,
        data: {
          id: "addDefaultGroup",
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/groups/" +
            context.defaultGroup,
          method: "POST",
          token: (context, event) => context.token,
        },
        devTools: true,
        onDone: {
          target: "groups",
          actions: assign({
            defaultGroupAddedStatus: (context, event) => {
              return true;
            },
          }),
        },
        onError: {
          target: "noGroups",
          actions: assign({
            defaultGroupAddedStatus: (context, event) => {
              return false;
            },
          }),
        },
      },
    },

    noFuture: {
      //can't store user locally so future bookings might be lost
      type: "final",
    },
    noGroups: {
      // no groups, so nothing can be booked at the moment - need to add groups
      type: "final",
    },
    loginDone: {
      type: "final",
      data: (context, event) => ({
        userName: context.userName,
        token: context.token,
        groups: context.groups,
      }),
    },
  },
});

/*
const service = interpret(parentMachine)
  .onTransition((state) => console.log(state.value))
  .start();
// => 'pending'
// ... after 6 seconds
// => 'timesUp'
*/

export default {
  name: "LoginParent",
  created() {
    // Start service on component creation
    this.ParentChildService.onTransition((state) => {
      // Update the current state component data property with the next state
      this.current = state;
      // Update the context component data property with the updated context
      this.context = state.context;
    }).start();
  },
  data() {
    return {
      // Interpret the machine and store it in data
      ParentChildService: interpret(parentMachine, {
        devTools: true,
      }).onTransition((state) => console.log(state.value)),

      // Start with the machine's initial state
      current: parentMachine.initialState,

      // Start with the machine's initial context
      context: parentMachine.context,
      //try to store the results somewhere where component can get them?
      results: {},
    };
  },
  methods: {
    // Send events to the service
    send(event) {
      this.ParentChildService.send(event);
    },
  },
};
