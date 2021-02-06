export const bearer = (state) => state.bearer;

export const bookingToken = (state) => state.bookingToken;
export const bookingTokenValid = (state) => state.bookingTokenValid;
export const loginResult = (state) => state.loginResult;
export const bookingTokenStatus = (state) => state.bookingTokenStatus;
export const bookingTokenExpiresAt = (state) => state.bookingTokenExpiresAt;
export const bookingsEnabled = (state) => state.bookingsEnabled;

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
    var results = state.finishedBookings.filter((obj) => {
      return obj.id === id;
    });
    if (results.length < 1) {
      return false;
    } else {
      return true;
    }
  };
};
