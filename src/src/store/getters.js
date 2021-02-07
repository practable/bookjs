import dayjs from "dayjs";

export const bearer = (state) => state.bearer;

export const bookingToken = (state) => state.bookingToken;
export const bookingTokenValid = (state) => state.bookingTokenValid;
export const loginResult = (state) => state.loginResult;
export const bookingTokenStatus = (state) => state.bookingTokenStatus;
export const bookingTokenExpiresAt = (state) => state.bookingTokenExpiresAt;
export const bookingsEnabled = (state) => state.bookingsEnabled;
export const finishedCount = (state) => state.finishedCount;
export const requestsMade = (state) => state.requestsMade;

export const details = (state) => {
  var details = [];
  var cutoff = state.lastPoolRefresh;

  for (const [id, description] of Object.entries(state.poolDescriptions)) {
    if (description.checked >= cutoff) {
      details.push(description.data);
    }
  }

  return details;
};

export const finishedBookings = (state) => state.finishedBookings.length;

export const atMaxBookings = (state) => {
  return state.activityBookings.length >= state.maxBookings;
};

export const getBookingByID = (state, id) => {
  return (id) => {
    var results = state.activityBookings.filter((obj) => {
      return obj.id === id;
    });
    if (results.length < 1) {
      return {};
    } else {
      return results[0].status;
    }
  };
};

export const getFinishedByID = (state, id) => {
  return (id) => {
    try {
      return state.finishedBookings[id].exp <= dayjs().unix();
    } catch (e) {
      console.log("error checking if finished", id, e);
      return false; // avoid prematurely clearing new bookings
    }
  };
};
export const getTimeLeftByID = (state, id) => {
  return (id) => {
    try {
      return state.finishedBookings[id].exp - dayjs().unix();
    } catch (e) {
      console.log("error checking if finished", id, e);
      return -1;
    }
  };
};
