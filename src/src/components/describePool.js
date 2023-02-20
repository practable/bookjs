import { mapState } from "vuex";
import axios from "axios";
import $ from "jquery";
export default {
  props: ["description", "key", "index", "enabled"],
  data() {
    return {
      bookingAttempted: false,
      bookingOK: false,
      result: "No booking attempted",
    };
  },
  components: {},
  computed: {
    title: function () {
      return this.description.name;
    },
    image: function () {
      return this.description.image;
    },
    what: function () {
      return this.description.short;
    },
    about: function () {
      return this.description.long;
    },
    status: function () {
      var s = this.poolStatus[this.description.id];
      if ($.isEmptyObject(s)) {
        return "Status unavailable";
      }
      if (!s.ok) {
        return "Status unavailable";
      }
      if (s.status.available == 0) {
        var unavailable = "Unavailable";

        if (s.status.later) {
          unavailable = "Available again soon";
        }
        if (s.status.used) {
          unavailable =
            unavailable +
            " (" +
            s.status.used +
            "/" +
            s.status.used +
            " in use)";
        }
        return unavailable;
      } else {
        var used = 0;
        if (s.status.used) {
          used = s.status.used;
        }
        var total = used + s.status.available;
        return "Available now: " + s.status.available + "/" + total;
      }
    },
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      poolStatus: (state) => state.poolStatus,
      details: (state) => state.poolDescriptions,
      ids: (state) => state.poolIDs,
    }),
  },
  methods: {
    closeResult() {
      this.bookingAttempted = false;
    },
    request(val) {
      var id = this.description.id;
      var duration = val * 60; //seconds
      axios
        .post(
          import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/pools/" +
            id +
            "/sessions?duration=" +
            duration,
          {},
          {
            headers: {
              Authorization: this.bookingToken,
            },
          }
        )
        .then(
          () => {
            //response
            this.bookingAttempted = true;
            this.bookingOK = true;
            this.result = 'OK - click on activity in "Your Bookings" to start';
          },
          (error) => {
            this.bookingAttempted = true;
            this.bookingOK = false;
            var reason = "Sorry: ";
            if (error.response) {
              reason += error.response.data;
            } else {
              reason += "this pool is not currently available";
            }
            this.result = reason;
            console.log(reason);
          }
        );
      this.$store.commit("incrementRequestsMade"); //trigger new booking to display
      this.getStatus();
    },
    getStatus() {
      var id = this.description.id;
      axios
        .get(
          import.meta.env.VITE_APP_BOOK_SERVER +
            "/api/v1/pools/" +
            id +
            "/status",
          {
            headers: {
              Authorization: this.bookingToken,
            },
          }
        )
        .then(
          (response) => {
            this.$store.commit("setPoolStatus", {
              id: id,
              status: response.data,
              ok: true,
            });
          },
          (error) => {
            this.$store.commit("setPoolStatus", {
              id: id,
              status: error,
              ok: false,
            });
          }
        );
    },
  },
  created() {
    this.getStatus();
  },
};
