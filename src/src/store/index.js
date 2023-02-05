import { createStore, createLogger } from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

const state = {
  userName: "",
  userNameValid: false,
  loginToken: "",
  loginResponse: {},
  loginValid: {},
  //new items not yet in use
  userID: "", // primary userID used for tracking analytics and making/getting user-made bookings
  sessionIDs: [], //additional one-time-use userIDs created by staff for pre-booked sessions, don't make new bookings against these, and don't allow cancellation of these (so one student can't cancel another??) How and when do we clean this out? When there are no bookings returned, clear the sessionID as being stale (or keep to show old bookings?!)
  logins: new Map(), //map of login tokens for each of the userID, and sessionIDs in our store.
  policies: new Map(), //map of all policies associated with the userID, but not sessionIDs
  slots: new Map(), //map of all slots associated with the userID (use the list of slots in the policy to select which slots to show in policy cards)
  bookings: new Map(), //map of all the bookings for all the userID and sessionIDs
  oldBookings: new Map(), //map of all the bookings for all the userID and sessionIDs (will only show sessionIDs on the machine they were used on)
  storeStatus: {}, //includes the current time when the status was updated, so can use that to check when to refresh
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  //plugins: [createLogger()],
});

export default store;
