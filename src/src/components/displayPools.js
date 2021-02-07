import axios from "axios";
import dayjs from "dayjs";
import describePool from "./describePool.vue";

import { mapState, mapGetters } from "vuex";
export default {
  components: {
    "describe-pool": describePool,
  },
  data() {
    return {
      poolFilter: "",
      disableRefresh: true,
    };
  },

  methods: {
    enableRefresh() {
      this.disableRefresh = false;
    },
    getStatus() {
      this.disableRefresh = true;
      setTimeout(this.enableRefresh, 5000);
      this.$store.commit("lastPoolRefresh", dayjs().unix());

      var i;
      for (i = 0; i < this.ids.length; i++) {
        axios
          .get("https://book.practable.io/api/v1/pools/" + this.ids[i], {
            headers: {
              Authorization: this.bookingToken,
            },
          })
          .then(
            (response) => {
              this.$store.commit(
                "setPoolIDsStatus",
                "Checked at " + dayjs().format("h:mm A")
              );
              this.$store.commit("addPoolDescription", {
                checked: dayjs().unix(),
                data: response.data,
              });
            },
            (error) => {
              this.$store.commit(
                "setPoolIDsStatus",
                "Last check failed at " + dayjs().format("h:mm A")
              );
            }
          );
      }
    },
  },
  computed: {
    canBook() {
      return this.bookingsEnabled && !this.atMaxBookings;
    },
    filteredDetails() {
      var poolFilter = this.poolFilter.toLowerCase();
      var details = this.details;

      details.sort((a, b) => (a.name > b.name ? 1 : -1));

      if (poolFilter == "") {
        return details;
      }
      var results = details.filter((obj) => {
        return obj.name.toLowerCase().includes(poolFilter);
      });

      return results;
    },
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.poolIDsStatus,
      ids: (state) => state.poolIDs,
    }),
    ...mapGetters([
      "bookingsEnabled",
      "atMaxBookings",
      "finishedCount",
      "details",
    ]),
  },
  watch: {
    bookingToken(is, was) {
      if (this.bookingTokenValid) {
        this.getStatus();
      }
    },
    finishedCount(is, was) {
      console.log("Finished Booking");
      this.getStatus();
    },
  },
};
