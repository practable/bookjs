import axios from "axios";
import dayjs from "dayjs";
import bookingDescription from "./bookingDescription.vue";

import { mapState } from "vuex";
export default {
  components: {
    "booking-description": bookingDescription,
  },

  methods: {
    getStatus() {
      this.$store.commit("clearBookings");
      axios
        .get("http://[::]:4000/api/v1/login", {
          headers: {
            Authorization: this.bookingToken,
          },
        })
        .then(
          (response) => {
            this.$store.commit(
              "setBookingsStatus",
              "Checked at " + dayjs().format("h:mm A")
            );

            console.log("getbookings getstatus", response.data.activities);
            var i;
            for (i = 0; i < response.data.activities.length; i++) {
              this.$store.commit("addActivityBooking", {
                id: response.data.activities[i].description.id,
                status: response.data.activities[i],
                ok: true,
              });
              console.log("activity from login:", response.data.activities[i]);
            }
          },
          (error) => {
            this.$store.commit(
              "setBookingsStatus",
              "Last check failed at " + dayjs().format("h:mm A")
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
        console.log("activity", this.fulldetails[i]);
        var d;
        d = this.fulldetails[i].status.description;
        d["exp"] = this.fulldetails[i].status.exp;
        descriptions.push(d); //this.fulldetails[i].status.description);
        console.log(d);
      }
      return descriptions;
    },
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.poolIDsStatus,
      fulldetails: (state) => state.activityBookings,
      ids: (state) => state.poolIDs,
    }),
  },
  watch: {
    bookingToken(is, was) {
      if (this.bookingTokenValid) {
        this.getStatus();
      }
    },
  },
};
