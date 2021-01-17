import axios from "axios";
import moment from "moment";
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
                "checked " + moment().fromNow()
              );
              this.$store.commit("addPoolDescription", response.data);
            },
            (error) => {
              this.$store.commit(
                "setPoolIDsStatus",
                "last check failed " + moment().fromNow()
              );
            }
          );
      }
    },
  },
  computed: {
    ...mapState({
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.poolIDsStatus,
      details: (state) => state.poolDescriptions,
      ids: (state) => state.poolIDs,
    }),
  },
};
