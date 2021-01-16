export const clear = (state) => {
  state.bearer = "";
};
export const clearToken = (state) => {
  state.token = "";
};

export const login = (state) => {
  state.bearer =
    "eykljdflkajsdfjlas.lkasjdfklasjdlkfjalskdf.ksdflkjaskldjflkasdjf";
};

export const updateToken = (state, token) => {
  state.token = token;
};
