import axios from "axios";
import dayjs from "dayjs";
import poolDescription from "./poolDescription.vue";

import { mapState } from "vuex";
export default {
  components: {
    "pool-description": poolDescription,
  },

  methods: {
    getStatus() {
      this.$store.commit("clearPoolDescriptions");
      var i;
      console.log("displayPools:state.poolsIDs:len", this.ids.length);
      for (i = 0; i < this.ids.length; i++) {
        axios
          .get("http://[::]:4000/api/v1/pools/" + this.ids[i], {
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
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.poolIDsStatus,
      details: (state) => state.poolDescriptions,
      ids: (state) => state.poolIDs,
    }),
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
