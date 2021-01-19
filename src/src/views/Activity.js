import launchActivity from "../components/launchActivity.vue";
import { mapState } from "vuex";

export default {
  name: "Activity",
  props: ["description", "bookingID"],
  components: {
    "launch-activity": launchActivity,
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
              "You can have up to " + response.data.max + " bookings at a time"
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
      status: (state) => state.bookingsStatus,
      fulldetails: (state) => state.activityBookings,
      ids: (state) => state.poolIDs,
    }),
  },
  watch: {
    $route(to, from) {
      console.log("Activity:", to, from);
    },

    bookingToken(is, was) {
      if (this.bookingTokenValid) {
        this.getStatus();
      }
    },
  },
};
