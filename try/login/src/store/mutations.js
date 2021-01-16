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
};
export const clearBookingToken = (state) => {
  state.bookingToken = "";
  state.bookingTokenValid = false;
};
