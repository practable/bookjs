import { mapActions, mapState } from "vuex";
import axios from "axios";

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
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiZ3JvdXAxIiwiZ3JvdXAyIiwiZ3JvdXAzIl0sInNjb3BlcyI6WyJsb2dpbjphZG1pbiJdLCJwb29scyI6W10sImF1ZCI6Imh0dHA6Ly9bOjpdOjQwMDAiLCJleHAiOjE2MTExOTI3NzcsImlhdCI6MTYxMDgzMjc3NywibmJmIjoxNjEwODMyNzc3fQ.bXTzjpf9tdxassgJYXEvCmz1i01_1owkio1VjXoLyKQ"
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
