import { mapState } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import $ from "jquery";
export default {
  props: ["description", "key", "index"],
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
      if (s.status.available == 0) {
        if (s.status.later) {
          return "Available again soon";
        } else {
          return "Unavailable";
        }
      } else {
        return "Available now: " + s.status.available;
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
    request() {
      console.log("requested booking");
    },
  },
  created() {
    var id = this.description.id;

    axios
      .get("http://[::]:4000/api/v1/pools/" + id + "/status", {
        headers: {
          Authorization: this.bookingToken,
        },
      })
      .then(
        (response) => {
          console.log(response.data);
          this.$store.commit("setPoolStatus", {
            id: id,
            status: response.data,
            ok: true,
          });
        },
        (error) => {
          console.log(error);

          this.$store.commit("setPoolStatus", {
            id: id,
            status: error.response.data,
            ok: false,
          });
        }
      );
  },
};
