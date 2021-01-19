export const deleteBearer = (state) => {
  state.bearer = "";
};
export const deleteToken = (state) => {
  state.token = "";
};

export const login = (state) => {
  state.bearer =
    "eykljdflkajsdfjlas.lkasjdfklasjdlkfjalskdf.ksdflkjaskldjflkasdjf";
};

export const setToken = (state, token) => {
  state.token = token;
};

export const setBookingToken = (state, token) => {
  state.bookingToken = token;
  state.bookingTokenValid = true;
  state.bookingTokenStatus = "valid";
  state.bookingTokenExpiresAt = 0;
};

export const setBookingTokenExpiresAt = (state, exp) => {
  state.bookingTokenExpiresAt = exp;
};

export const clearBookingToken = (state, reason) => {
  state.bookingToken = "";
  state.bookingTokenValid = false;
  state.bookingTokenStatus = "empty";
  state.loginResult = reason;
};

export const setStoreDetails = (state, details) => {
  state.storeStatusDetails = details;
};

export const setStoreStatus = (state, status) => {
  state.storeStatus = status;
};

export const setPoolIDs = (state, ids) => {
  console.log("store:setPoolIDs:len", ids.length);
  state.poolIDs = ids;
};

export const setPoolIDsStatus = (state, status) => {
  state.poolIDsStatus = status;
};

export const addPoolDescription = (state, description) => {
  state.poolDescriptions.push(description);
};
export const clearPoolDescriptions = (state) => {
  console.log("clearing poolDescriptions");
  state.poolDescriptions = [];
};
export const setPoolStatus = (state, status) => {
  state.poolStatus[status.id] = status;
};

export const addActivityBooking = (state, booking) => {
  state.activityBookings.push(booking);
};
export const clearBookings = (state, booking) => {
  state.activityBookings = [];
};

export const setBookingsStatus = (state, status) => {
  state.bookingsStatus = status;
};

export const deleteBooking = (state, booking) => {
  var removeIndex = state.activityBookings
    .map(function (item) {
      return item.id;
    })
    .indexOf(booking.id);
  state.activityBookings.splice(removeIndex, 1);
};
