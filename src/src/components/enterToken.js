import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";
export default {
  data() {
    return {
      stuff: null,
      expiresAt: null,
      loginToken: null,
      result: "empty",
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
      bearer: (state) => state.bookingToken,
      valid: (state) => state.bookingTokenValid,
    }),
  },
  methods: {
    quickToken() {
      this.$store.commit(
        "setToken",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiZXZlcnlvbmUiLCJjb250cm9sczMiXSwic2NvcGVzIjpbImxvZ2luOnVzZXIiXSwicG9vbHMiOltdLCJhdWQiOiJodHRwOi8vWzo6XTo0MDAwIiwiZXhwIjoxNjExMjAyMTg0LCJpYXQiOjE2MTA4NDIxODQsIm5iZiI6MTYxMDg0MjE4NH0.1ZJRaiD_-2vOtVd0geegPp4e-28CC4KqhOE4IHUPH7g"
      );
    },
    updateToken(e) {
      this.$store.commit("setToken", e.target.value);
    },
    bookingLogin() {
      axios
        .post(
          "http://[::]:4000/api/v1/login",
          {},
          {
            headers: {
              Authorization: this.token,
            },
          }
        )
        .then(
          (response) => {
            this.stuff = response.data;
            this.expiresAt = response.data.exp;
            this.loginToken = response.data.token;
            this.result = response.statusText;
            this.$store.commit("setBookingToken", response.data.token);
            this.$store.commit("setBookingTokenExpiresAt", response.data.exp);
            this.$store.commit("setPoolIDs", response.data.pools);
            console.log(response.data.pools);
            this.$store.commit(
              "setPoolIDsStatus",
              "checked " + moment().fromNow()
            );
          },
          (error) => {
            if (error.response) {
              this.loginToken = "";
              this.result = error.response.statusText;
            } else {
              this.result = "error";
            }
            this.$store.commit("clearBookingToken", "login failed");
          }
        );
    },
    ...mapActions(["login", "deleteToken"]),
  },
};
