import { mapActions, mapGetters, mapState } from "vuex";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      userNameValidString: "",
      loginStatusString: "",
    };
  },
  computed: {
    ...mapGetters(["getUserName", "getUserNameValid", "getLoginValid"]),
  },
  methods: {
    getNewUserName() {
      var $this = this;
      axios
        .post(import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/unique")
        .then(
          (response) => {
            if (response.data) {
              console.log("userName.js: /users/unique", response.data);
              if (response.data.user_name) {
                if (this.isXID(response.data.user_name)) {
                  console.log(
                    "userName.js: valid new user name from /users/unique",
                    response.data.user_name
                  );
                  $this.saveUserName(response.data.user_name);
                }
              } else {
                console.log(
                  "userName.js: /users/unique no user_name in response"
                );
              }
            } else {
              console.log("userName.js: /users/unique", "no data response");
            }
          },
          (error) => {
            if (error.response) {
              console.log("userName.js: /users/unique", error.response);
            }
          }
        );
    },
    getLoginToken() {
      var $this = this;
      axios
        .post(
          import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/login/" +
            $this.getUserName
        )
        .then(
          (response) => {
            if (response.data) {
              console.log(
                "userName.js: /login/",
                $this.getUserName,
                response.data
              );
              $this.handleLoginResponse(response.data);
            } else {
              console.log("userName.js: /login/", $this.getUserName, response);
            }
          },
          (error) => {
            if (error.response) {
              console.log(
                "userName.js: /login/",
                $this.getUserName,
                error.response
              );
            }
          }
        );
    },
    obtainUserName() {
      var userName = localStorage.getItem("userName", false);

      if (this.isXID(userName)) {
        console.log(
          "userName.js: valid userName found in localstorage",
          userName
        );
        this.saveUserName(userName); //in the store, for components to read
        return;
      }

      console.log(
        "userName.js: problem with userName found in localstorage (must be XID)",
        userName
      );

      this.getNewUserName(); //will store the result as well
    },
    isXID(str) {
      // https://github.com/rs/xid
      // To validate a base32 xid, expect a 20 chars long, all lowercase sequence of a to v letters and 0 to 9 numbers ([0-9a-v]{20}).
      if (!str) {
        console.log("isXID arg is undefined");
        return false;
      }
      if (str.length != 20) {
        console.log("isXID arg length is not 20", str.length);
        return false;
      }
      const regex = new RegExp("[0-9a-v]{20}");
      var result = regex.test(str);
      console.log("isXID regexp test", result);
      return result;
    },
    saveUserName(userName) {
      var valid = this.isXID(userName);
      console.log("userName to save", userName, "valid", valid);
      localStorage.setItem("userName", userName);
      this.$store.commit("setUserName", userName);
      this.$store.commit("setUserNameValid", valid);
    },
    invalidateLogin() {
      this.$store.commit("setLoginValid", false);
      this.$store.commit("setLoginToken", "");
    },
    handleLoginResponse(data) {
      if (!data) {
        return;
      }
      console.log("login response", data);
      this.$store.commit("setLoginResponse", data);
      if (!data.token) {
        this.$store.commit("setLoginValid", false);
      } else {
        this.$store.commit("setLoginToken", data.token);
        this.$store.commit("setLoginValid", true);
        if (data.exp) {
          var now = new Date().getTime();
          var waitForMilliseconds = data.exp * 1000 - now; //convert exp to milliseconds
          if (waitForMilliseconds > 0) {
            console.log("login expires in", waitForMilliseconds);
            const redoLogin = setTimeout(
              this.invalidateLogin,
              waitForMilliseconds
            );
          } else {
            console.log(
              "token exp in past?",
              data.exp,
              "now",
              now,
              "wait",
              waitForMilliseconds
            );
          }
        }
      }
    },
  },
  mounted() {
    this.obtainUserName();
  },
  watch: {
    getUserNameValid(newValue, oldValue) {
      if (newValue) {
        this.userNameValidString = "valid";
        this.getLoginToken();
      } else {
        this.userNameValidString = "invalid";
      }
    },
    getLoginValid(newValue, oldValue) {
      if (newValue) {
        this.loginStatusString = "logged in";
      } else {
        this.loginStatusString = "not logged in";
      }
    },
  },
};
