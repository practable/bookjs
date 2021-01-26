import axios from "axios";
import moment from "moment";
import { mapState } from "vuex";
export default {
  methods: {
    getStatus() {
      //.get("http://[::]:4000/api/v1/admin/status", {
      axios
        .get("https://book.practable.io/api/v1/admin/status", {
          headers: {
            Authorization: this.bookingToken,
          },
        })
        .then(
          (response) => {
            this.$store.commit(
              "setStoreStatus",
              "checked " + moment().fromNow()
            );
            this.$store.commit("setStoreDetails", response.data);
          },
          (error) => {
            this.$store.commit(
              "setStoreStatus",
              "last check failed " + moment().fromNow()
            );
          }
        );
    },
  },
  computed: {
    ...mapState({
      bookingToken: (state) => state.bookingToken,
      status: (state) => state.storeStatus,
      details: (state) => state.storeStatusDetails,
    }),
  },
};
