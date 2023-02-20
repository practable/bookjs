import { useBookingService } from "./bookingMachine.js";

export default {
  props: ["response"],
  computed: {
    reason: function () {
      if (!this.response) {
        return "";
      }
      if (this.response.hasOwnProperty("results")) {
        if (this.response.results) {
          // it is undefined for some cases
          if (this.response.results.hasOwnProperty("message")) {
            return this.response.results.message;
          }
        }
      } else {
        return "";
      }
    },
    status: function () {
      if (!this.response) {
        return "";
      }
      if (this.response.hasOwnProperty("status")) {
        if (this.response.status) {
          // it is undefined for some cases
          return this.response.status;
        }
      } else {
        return "";
      }
    },
    next: function () {
      if (this.status === 204) {
        return "See your updated list of bookings";
      } else {
        return "Go back to catalogue";
      }
    },

    message: function () {
      console.log("status", this.status);
      if (this.status === 204) {
        return "Booking successful";
      } else {
        return (
          "Booking failed with code " + this.status + " because " + this.reason
        );
      }
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      var path = "/";
      this.$router.push({ path: path });
    },
  },
  mounted() {
    var path = "/";
    if (!this.response) {
      this.$router.push({ path: path });
    }
    if (!this.response.hasOwnProperty("status")) {
      //if page refreshes at this routing, go back to home to avoid empty page
      this.$router.push({ path: path });
    }
  },
  setup() {
    const { state, send } = useBookingService();
    return {
      state,
      send,
    };
  },
};
