import { mapState } from "vuex";
import axios from "axios";
import $ from "jquery";
export default {
  props: ["description", "key", "index", "enabled"],
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
      console.log("status", s);
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
        if (!!s.status.used) {
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
        console.log(s.status.used);
        var used = 0;
        if (!!s.status.used) {
          used = s.status.used;
        }
        var total = used + s.status.available;
        return "Available now: " + s.status.available + "/" + total;
        //return "Available now: " + s.status.available;
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
    request(val) {
      console.log("requested booking of ", val);

      var id = this.description.id;
      var duration = val * 60; //seconds
      console.log(this.bookingToken);
      axios
        .post(
          //"http://[::]:4000/api/v1/pools/" +
          "https://book.practable.io/api/v1/pools/" +
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
          (response) => {
            this.$store.commit("addActivityBooking", {
              id: response.data.description.id,
              status: response.data,
              ok: true,
            });
          },
          (error) => {
            console.log(error.response.data);
          }
        );
      this.getStatus();
    },
    getStatus() {
      var id = this.description.id;
      //.get("http://[::]:4000/api/v1/pools/" + id + "/status", {
      axios
        .get("https://book.practable.io/api/v1/pools/" + id + "/status", {
          headers: {
            Authorization: this.bookingToken,
          },
        })
        .then(
          (response) => {
            console.log("status response", response);
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
