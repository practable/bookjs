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
    };
  },

  methods: {
    getStatus() {
      this.$store.commit("clearPoolDescriptions");
      var i;
      console.log("displayPools:state.poolsIDs:len", this.ids.length);
      for (i = 0; i < this.ids.length; i++) {
        //.get("http://[::]:4000/api/v1/pools/" + this.ids[i], {
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
              this.$store.commit("addPoolDescription", response.data);
              console.log("displayPools:addPoolDescription:count", i);
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
      details: (state) => state.poolDescriptions,
      ids: (state) => state.poolIDs,
    }),
    ...mapGetters(["bookingsEnabled", "atMaxBookings"]),
  },
  watch: {
    bookingToken(is, was) {
      if (this.bookingTokenValid) {
        console.log("displayPools:watch:bookingToken");
        this.getStatus();
      }
    },
  },
};
