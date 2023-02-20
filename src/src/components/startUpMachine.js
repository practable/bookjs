import { assign, createMachine } from "xstate";
import { inject, provide } from "vue";
import { useActor, useInterpret } from "@xstate/vue";
import { useRoute } from "vue-router";

const getGroupsLocally = (context, event) =>
  new Promise((resolve, reject) => {
    var groupNames = JSON.parse(localStorage.getItem("groupNames", false));

    if (groupNames == null) {
      return reject("no groupNames found");
    }
    if (groupNames == "") {
      return reject("no groupNames found");
    }

    return resolve({ status: "ok", groupNames: groupNames });
  });

const storeGroupsLocally = (context, event) =>
  new Promise((resolve, reject) => {
    const groupNames = [];

    function Add(item) {
      //deduplicate
      if (!groupNames.includes(item)) {
        groupNames.push(item);
      }
    }

    if (Array.isArray(context.groupsLocal)) {
      context.groupsLocal.forEach(Add);
    }

    if (Array.isArray(context.groupsQuery)) {
      context.groupsQuery.forEach(Add);
    }

    context.groupNames = groupNames;

    localStorage.setItem("groupNames", JSON.stringify(groupNames));

    return resolve();
  });

const getSessionsLocally = (context, event) =>
  new Promise((resolve, reject) => {
    var sessionNames = JSON.parse(localStorage.getItem("sessionNames", false));

    if (sessionNames == null) {
      return reject("no sessionNames found");
    }
    if (sessionNames == "") {
      return reject("no sessionNames found");
    }

    return resolve({ status: "ok", sessionNames: sessionNames });
  });

const storeSessionsLocally = (context, event) =>
  new Promise((resolve, reject) => {
    const sessionNames = [];

    function Add(item) {
      //deduplicate
      if (!sessionNames.includes(item)) {
        sessionNames.push(item);
      }
    }

    if (Array.isArray(context.sessionsLocal)) {
      context.sessionsLocal.forEach(Add);
    }

    if (Array.isArray(context.sessionsQuery)) {
      context.sessionsQuery.forEach(Add);
    }
    context.sessionNames = sessionNames;

    localStorage.setItem("sessionNames", JSON.stringify(sessionNames));

    return resolve();
  });

export default createMachine({
  id: "startUpMachine",
  initial: "groupsLocal",
  context: {
    groupsQuery: [],
    groupsLocal: [],
    groupNames: [],
    sessionsQuery: [],
    sessionsLocal: [],
    sessionNames: [],
  },
  devTools: true,
  predictableActionArguments: true,
  states: {
    wait: {
      on: {
        QUERY: {
          target: "groupsLocal",
          actions: assign({
            groupsQuery: (context, event) => {
              return event.data.groupNames;
            },
            sessionsQuery: (context, event) => {
              return event.data.sessionNames;
            },
          }),
        },
      },
    },

    groupsLocal: {
      invoke: {
        src: getGroupsLocally,
        onDone: {
          target: "storeGroups",
          actions: assign({
            groupsLocal: (context, event) => {
              return event.data.groupNames;
            },
          }),
        },
        onError: {
          target: "storeGroups",
        },
      },
    },

    storeGroups: {
      invoke: {
        src: storeGroupsLocally,
        onDone: {
          target: "sessionsLocal",
        },
        onError: {
          target: "sessionsLocal",
        },
      },
    },

    sessionsLocal: {
      invoke: {
        src: getSessionsLocally,
        onDone: {
          target: "storeSessions",
          actions: assign({
            sessionsLocal: (context, event) => {
              return event.data.sessionNames;
            },
          }),
        },
        onError: {
          target: "storeSessions",
        },
      },
    },

    storeSessions: {
      invoke: {
        src: storeSessionsLocally,
        onDone: {
          target: "done",
        },
        onError: {
          target: "done",
        },
      },
    },
    done: {
      type: "final",
      data: (context, event) => ({
        groupNames: context.groupNames,
        sessionNames: context.sessionNames,
      }),
    },
  },
});
