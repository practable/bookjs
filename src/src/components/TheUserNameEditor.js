import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from "moment";
import jwt_decode from "jwt-decode";

export default {
  data() {
    return {
      userName: "",
      valid: false,
    };
  },
  methods: {
    getNewUserName() {
      axios
        .post(import.meta.env.VITE_APP_BOOK_SERVER + "/api/v1/users/unique")
        .then(
          (response) => {
            if (response.data) {
              console.log("userName.js: /users/unique", response.data);
              if (response.data.user_name) {
                return response.data.user_name;
              } else {
                console.log(
                  "userName.js: /users/unique",
                  "no user_name in response"
                );
                return "";
              }
            } else {
              console.log("userName.js: /users/unique", "no data response");
              return "";
            }
          },
          (error) => {
            if (error.response) {
              console.log("userName.js: /users/unique", error.response);
              return "";
            }
          }
        );
    },
    getCurrentUserName() {
      return localStorage.getItem("userName", false);
    },
    getUserName() {
      var userName = this.getCurrentUserName();

      if (this.isXID(userName)) {
        console.log(
          "userName.js: valid userName found in localstorage",
          userName
        );
        this.userName = userName;
        return;
      }

      console.log(
        "userName.js: problem with userName found in localstorage (must be XID)",
        userName
      );

      userName = this.getNewUserName();

      if (this.isXID(userName)) {
        console.log(
          "userName.js: valid userName obtained from server",
          userName
        );
        this.updateUserName(userName);
        return;
      }

      console.log(
        "userName.js: problem with userName obtained from server (must be XID)",
        userName
      );
      return "";
    },
    isXID(str) {
      // https://github.com/rs/xid
      // To validate a base32 xid, expect a 20 chars long, all lowercase sequence of a to v letters and 0 to 9 numbers ([0-9a-v]{20}).
      const regex = new RegExp("[0-9a-v]{20}");
      return regex.test(str);
    },
    updateUserName(userName) {
      console.log("userName.js: new userName is", userName);
      this.userName = userName;
      localStorage.set("userName", userName);
      this.$store.commit("setUserName", userName);
    },
  },
  mounted() {
    this.getUserName();
  },
  watch: {
    userName(newUserName, oldUserName) {
      this.valid = this.isXID(newUserName);
    },
  },
};
