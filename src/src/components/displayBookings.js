import axios from "axios";
import dayjs from "dayjs";
import describeBooking from "./describeBooking.vue";

import { mapState, mapGetters } from "vuex";
export default {
  components: {
    "describe-booking": describeBooking,
  },
  methods: {
    getStatus() {
      axios
        .get("https://book.practable.io/api/v1/login", {
          headers: {
            Authorization: this.bookingToken,
          },
        })
        .then(
          (response) => {
            var statusMessage = "";

            try {
              if (response.data.locked) {
                statusMessage =
                  "Bookings are currently suspended. " + response.data.msg;
                this.$store.commit("setBookingsEnabled", false);
              } else {
                statusMessage =
                  " You can have up to " +
                  response.data.max +
                  " bookings at a time. " +
                  response.data.msg;
                this.$store.commit("setBookingsEnabled", true);
                this.$store.commit("setMaxBookings", response.data.max);
              }
            } catch (e) {
              statusMessage = "Booking system status unknown";
            }

            this.$store.commit("setBookingsStatus", statusMessage);

            this.$store.commit("replaceBookings", response.data.activities);
          },
          (error) => {
            this.$store.commit(
              "setBookingsStatus",
              "No bookings found when checked at " + dayjs().format("h:mm A")
            );
          }
        );
    },
  },
  computed: {
    details: function () {
      var descriptions;
      var i;
      descriptions = [];
      for (i = 0; i < this.fulldetails.length; i++) {
        var d;
        d = this.fulldetails[i].status.description;
        d["exp"] = this.fulldetails[i].status.exp;
        descriptions.push(d);
      }
      return descriptions;
    },
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.bookingsStatus,
      fulldetails: (state) => state.activityBookings,
      ids: (state) => state.poolIDs,
    }),
    ...mapGetters(["atMaxBookings", "requestsMade", "finishedCount"]),
  },
  watch: {
    bookingToken(is, was) {
      if (this.bookingTokenValid) {
        this.getStatus();
      }
    },
    requestsMade(is, was) {
      this.getStatus();
      setTimeout(this.getStatus, 2000);
    },
    finishedCount(is, was) {
      setTimeout(this.getStatus, 1500);
    },
  },
};
