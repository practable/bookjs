import sessionMachine from "./sessionMachine.js";
import { interpret } from "xstate";

export default function (context, event) {
  let promises = [];
  let names = [];

  context.sessionNames.forEach(function (session) {
    names.push(session);
    promises.push(
      new Promise((resolve, reject) => {
        const thisSessionMachine = sessionMachine.withContext({
          session: session,
        });
        const service = interpret(thisSessionMachine)
          .onDone((event) => {
            //console.log("sessionBookingMachine onDone", event.data);
            resolve(event.data);
          })
          .start();
      })
    );
  });

  return Promise.all(promises).then((values) => {
    return new Promise((resolve, reject) => {
      var bookings = {};
      names.forEach(function (item, index) {
        bookings[item] = values[index];
      });

      resolve({ status: "ok", bookings: bookings });
    });
  });
}
