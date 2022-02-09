import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";

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
    updateToken(e) {
      this.$store.commit("setToken", e.target.value);
    },
    bookingLogin(token) {
      //get expired token from webstorage

      var oldToken;
      var body;

      oldToken = this.$localStorage.get("token", false);

      if (oldToken) {
        body = { token: oldToken };
      } else {
        body = {};
      }
      axios
        .post(process.env.VUE_APP_BOOK_SERVER + "/api/v1/login", body, {
          headers: { Authorization: token },
        })
        .then(
          (response) => {
            this.stuff = response.data;
            this.expiresAt = response.data.exp;
            this.loginToken = response.data.token;

            this.$localStorage.set("token", this.loginToken);
            this.result = response.statusText;
            this.$store.commit("setBookingToken", response.data.token);
            this.$store.commit("setBookingTokenExpiresAt", response.data.exp);
            this.$store.commit("setPoolIDs", response.data.pools);
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
  mounted() {
    var code = "";

    try {
      code = String(this.$route.query.c);
    } catch (e) {
      console.log(
        "using default code because error obtaining code from query param c",
        e
      );
    }

    if (code == "undefined" || code == "") {
      code = "everyone";
    }

    axios.get(process.env.VUE_APP_ASSET_SERVER + "/tokens/" + code, {}).then(
      (response) => {
        try {
          var decoded = jwt_decode(response.data);
          this.bookingLogin(response.data);
        } catch (e) {
          console.log("could not decode token", e);
        }
      },
      (error) => {
        console.log("error getting login token", error);
      }
    );
  },
};
