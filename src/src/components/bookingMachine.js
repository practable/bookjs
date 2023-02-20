import { inject, provide } from "vue";
//import type { InjectionKey } from "vue"; //https://github.com/vuejs/core/issues/5697
import { useActor, useInterpret } from "@xstate/vue";

import {
  assign,
  createMachine,
  interpret,
  send,
  spawn,
  sendParent,
} from "xstate";

import aggregatePolicies from "./aggregatePolicies.js";
import aggregateSlots from "./aggregateSlots.js";
import completeSlots from "./completeSlots.js";
import fetchMachine from "./fetchMachine.js";
import getGroupDetails from "./getGroupDetails.js";
import getSlotAvailable from "./getSlotAvailable.js";
import loginMachine from "./loginMachine.js";
import startUpMachine from "./startUpMachine.js";
import getSessionBookings from "./getSessionBookings.js";
/*
import BookingSlots from "./BookingSlots.vue";
import YourBookings from "./YourBookings.vue";
import ChooseTime from "./ChooseTime.vue";
import DisplayBookingResponse from "./DisplayBookingResponse.vue";
import LaunchActivity from "./LaunchActivity.vue";
*/

const bookingMachine = createMachine({
  id: "bookingMachine",
  initial: "ready",
  context: {
    activities: {},
    activityResponse: {},
    bookingResponse: {},
    bookingToCancel: {},
    cancelResponse: {},
    bookings: "",
    userName: "",
    token: "",
    groups: {}, //groups we can choose from (includes description)
    group: null, //name of currently selected group
    groupDetails: {}, //subMachines see https://xstate.js.org/docs/tutorials/reddit.html#spawning-subreddit-actors
    groupNames: [], // set by the LOGIN event, event sender must include any default group
    groupsQuery: [],

    policies: {},
    sessionNames: {}, //usernames that we will access bookings for, but not cancel bookings or do new bookings with
    sessionsQuery: [],
    slots: [],
    status: {
      startup: true, //will get removed (become undefined) when we get an actual status
      locked: true,
      message: " Configuring and checking for system access .... ",
    },
    available: {},
    completeSlots: {},
    slotSelected: "",
    cancelBooking: {},
  },
  predictableActionArguments: true,
  states: {
    ready: {
      on: {
        STARTUP: {
          target: "startUp",
          actions: assign({
            groupsQuery: (context, event) => {
              //save the groups from the query params
              return event.data.groupNames;
            },
            sessionsQuery: (context, event) => {
              //save the sessions from the query params
              return event.data.sessionNames;
            },
          }),
        },
      },
    },
    startUp: {
      invoke: {
        src: startUpMachine,
        data: {
          groupsQuery: (context, event) => {
            // put in the groups from the query params
            return context.groupsQuery;
          },
          sessionsQuery: (context, event) => {
            // put in the session from the query params
            return context.sessionsQuery;
          },
        },
        onDone: {
          target: "login",
          actions: assign({
            groupNames: (context, event) => {
              let g = [];
              if (context.groupNames && Array.isArray(context.groupNames)) {
                g = context.groupNames; // allow the initial state of machine to contain some groups
              }
              // expect an array
              if (event.data.hasOwnProperty("groupNames")) {
                if (Array.isArray(event.data.groupNames)) {
                  event.data.groupNames.forEach(function (item) {
                    g.push(item);
                  });
                }
              }
              return g;
            },
            sessionNames: (context, event) => {
              let s = [];
              if (context.sessionNames && Array.isArray(context.sessionNames)) {
                s = context.sessionNames; // allow the initial state of machine to contain some sessions
              }
              // expect an array
              if (event.data.hasOwnProperty("sessionNames")) {
                if (Array.isArray(event.data.sessionNames)) {
                  event.data.sessionNames.forEach(function (item) {
                    s.push(item);
                  });
                }
              }
              return s;
            },
          }),

          onError: {
            target: "login", //try logging in anyway!
          },
        },
      },
    },
    login: {
      invoke: {
        src: loginMachine,
        data: {
          groupNames: (context, event) => {
            return context.groupNames; // component that sends LOGIN event responsible for including defaultGroup
            // this makes it easier for someone maintaining the code to change default group without touching the
            // xstate machine code
          },
        },
        onDone: {
          target: "status",
          actions: assign({
            groups: (context, event) => {
              return event.data.groups;
            },
            token: (context, event) => {
              return event.data.token;
            },
            userName: (context, event) => {
              return event.data.userName;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },
    bookings: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/bookings",
          method: "GET",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "sessions",
          actions: assign({
            bookings: (context, event) => {
              return event.data.results;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },
    sessions: {
      invoke: {
        src: getSessionBookings,
        onDone: {
          target: "groups",
          actions: assign({
            bookings: (context, event) => {
              let bk = context.bookings;
              for (const session in event.data.bookings) {
                event.data.bookings[session].bookings.forEach(function (
                  booking
                ) {
                  booking.isSession = true;
                  booking.session = session;
                  bk.push(booking);
                });
              }

              return bk;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },

    refreshBookings: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/bookings",
          method: "GET",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "refreshSessions",
          actions: assign({
            bookings: (context, event) => {
              return event.data.results;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },
    refreshSessions: {
      invoke: {
        src: getSessionBookings,
        onDone: {
          target: "idle",
          actions: assign({
            bookings: (context, event) => {
              console.log("getSessionBookings returned", event.data);
              console.log("TODO add session bookings to context.bookings");

              let bk = context.bookings;
              for (const session in event.data.bookings) {
                event.data.bookings[session].bookings.forEach(function (
                  booking
                ) {
                  booking.isSession = true;
                  booking.session = session;
                  bk.push(booking);
                });
              }

              return bk;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },
    groups: {
      invoke: {
        src: getGroupDetails,
        onDone: {
          target: "policies",
          actions: assign({
            groupDetails: (context, event) => {
              return event.data.groupDetails;
            },
          }),
        },
        onError: {
          target: "idle", //TODO figure out what to do here if error
        },
      },
    },
    policies: {
      invoke: {
        src: aggregatePolicies,
        onDone: {
          target: "slots",
          actions: assign({
            policies: (context, event) => {
              return event.data.policies;
            },
          }),
        },
        onError: {
          target: "idle", //TODO figure out what to do here if error
        },
      },
    },
    slots: {
      invoke: {
        src: aggregateSlots,
        onDone: {
          target: "available",
          actions: assign({
            slots: (context, event) => {
              return event.data.slots;
            },
          }),
        },
        onError: {
          target: "idle", //TODO figure out what to do here if error
        },
      },
    },
    status: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/status",
          method: "GET",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "bookings",
          actions: assign({
            status: (context, event) => {
              return event.data.results;
            },
          }),
        },
        onError: {
          target: "terminated",
        },
      },
    },
    available: {
      invoke: {
        src: getSlotAvailable,
        onDone: {
          target: "completeSlots",
          actions: assign({
            available: (context, event) => {
              return event.data.available;
            },
          }),
        },
        onError: {
          target: "idle", //TODO figure out what to do here if error
        },
      },
    },
    completeSlots: {
      invoke: {
        src: completeSlots,
        onDone: {
          target: "idle",
          actions: assign({
            completeSlots: (context, event) => {
              return event.data.slots;
            },
          }),
        },
        onError: {
          target: "idle", //TODO figure out what to do here if error
        },
      },
    },
    idle: {
      on: {
        BOOKING: {
          target: "booking",
          actions: assign({
            slotSelected: (context, event) => {
              let slot = event.value; //// note we are using send({type:"BOOKING",value:"someslot"})
              return slot;
            },
          }),
        },
        CANCELBOOKING: {
          target: "cancelBooking",
          actions: assign({
            cancelBooking: (Context, event) => {
              return event.value;
            },
          }),
        },
        GETACTIVITY: {
          target: "getActivity",
          actions: assign({
            getActivity: (Context, event) => {
              return event.value;
            },
          }),
        },
      },
    },
    booking: {
      on: {
        REQUESTBOOKING: {
          target: "requestBooking",
          actions: assign({
            requestBooking: (context, event) => {
              return event.value;
            },
          }),
        },
        BACK: {
          target: "idle",
          actions: assign({
            slotSelected: (context, event) => {
              return undefined;
            },
            requestBooking: (context, event) => {
              return undefined;
            },
          }),
        },
      },
    },
    selected: {},
    cancelBooking: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/bookings/" +
            context.cancelBooking.name,
          method: "DELETE",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "refreshBookings", //nb this catches 404 so not booking success yet!
          actions: assign({
            cancelResponse: (context, event) => {
              console.log(event.data);
              return event.data;
            },
          }),
        },
        onError: {
          target: "idle",
          actions: assign({
            cancelResponse: (context, event) => {
              console.log(event.data);
              return event.data;
            },
          }),
        },
      },
    },
    getActivity: {
      invoke: {
        src: fetchMachine, //TODO check map for entry first
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/users/" +
            context.userName +
            "/bookings/" +
            context.getActivity.name,
          method: "PUT",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "idle", //nb this catches 404 so not booking success yet! //TODO go to activityResponse
          actions: assign({
            activityResponse: (context, event) => {
              //context.activities[context.getActivity.name] = event.data; //TODO put map entry in own assign function?
              console.log(event.data);
              return event.data;
            },
            activities: (context, event) => {
              let a = context.activities;
              a[context.getActivity.name] = event.data;
              return a;
            },
          }),
        },
        onError: {
          target: "idle", //TODO go to an activityError state?
          actions: assign({
            activityFailedReason: (context, event) => {
              return event;
            },
          }),
        },
      },
    },
    requestBooking: {
      invoke: {
        src: fetchMachine,
        data: {
          path: (context, event) =>
            import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/slots/" +
            context.requestBooking.id +
            "?" +
            new URLSearchParams({
              user_name: context.userName,
              from: context.requestBooking.start,
              to: context.requestBooking.end,
            }),
          method: "POST",
          token: (context, event) => context.token,
        },
        onDone: {
          target: "refreshBookings", //nb this catches 404 so not booking success yet!
          actions: assign({
            bookingResponse: (context, event) => {
              console.log("requestBooking success response", event.data);
              return event.data;
            },
          }),
        },
        onError: {
          target: "idle",
          actions: assign({
            bookingResponse: (context, event) => {
              console.log(event.data);
              return event.data;
            },
          }),
        },
      },
    },

    bookingError: {}, //consider going straight on to refreshBookings if successful
    bookingSuccess: {},
    bookingFailed: {},
    displayGroup: {},

    terminated: {
      type: "final",
    },
  },
});
/*
 slotsComplete() {
      if (!context) {
        return {};
      }
      let items = context.slots;
      let results = {};

      for (const name in items) {
        results[name] = context.slots[name];
        results[name].available = context.available[name];
      }

      return slotsComplete;
    },

*/

/*
export default {
  name: "Booking",
  components: {
    BookingSlots,
    YourBookings,
    ChooseTime,
    DisplayBookingResponse,
    LaunchActivity,
  },
  computed: {
    filteredSlots() {
      var filter = this.slotFilter.toLowerCase();
      var items = context.slots;

      items.sort((a, b) => (a.name > b.name ? 1 : -1));

      if (filter == "") {
        return items;
      }
      var results = items.filter((obj) => {
        return obj.name.toLowerCase().includes(filter);
      });

      return results;
    },
    slotsComplete() {
      console.log(context);
      return { not: "implemented" };
    },
  },
  created() {
    // Start service on component creation
    this.BookingService.onTransition((state) => {
      // Update the current state component data property with the next state
      this.current = state;
      // Update the context component data property with the updated context
      this.context = state.context;
    }).start();
  },
  data() {
    return {
      // Interpret the machine and store it in data
      BookingService: interpret(bookingMachine, {
        devTools: true,
      }).onTransition((state) => console.log(state.value)),

      // Start with the machine's initial state
      current: bookingMachine.initialState,

      // Start with the machine's initial context
      context: bookingMachine.context,
      //try to store the results somewhere where component can get them?
      results: {},
    };
  },
  methods: {
    // Send events to the service
    send(event) {
      this.BookingService.send(event);
    },
  },
};
*/
// https://codesandbox.io/s/vg7qh?file=/src/SomeComponent.vue

export function provideBookingService() {
  const service = useInterpret(bookingMachine, { devTools: true });
  provide("bookingService", service);
}

export function useBookingService() {
  const service = inject("bookingService");

  if (!service) {
    throw new Error("booking service not provided");
  }

  return useActor(service);
}
