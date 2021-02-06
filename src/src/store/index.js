import { createStore, createLogger } from "vuex";
import * as getters from "./getters";
import * as actions from "./actions";
import * as mutations from "./mutations";

const state = {
  bearer: "",
  token: "",
  bookingToken: "",
  bookingTokenValid: false,
  loginResult: "login not attempted",
  bookingsEnabled: false,
  bookingTokenStatus: "empty",
  bookingTokenExpiresAt: 0,
  maxBookings: 0,
  storeStatus: "unknown",
  storeStatusDetails: null,
  poolIDsStatus: "unknown",
  poolIDs: [],
  poolDescriptions: [],
  poolStatus: {},
  activityBookings: [],
  finishedBookings: [],
};

const store = createStore({
  state,
  getters,
  actions,
  mutations,
  plugins: [createLogger()],
});

export default store;
