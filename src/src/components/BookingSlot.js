import dayjs from "dayjs/esm/index.js";
import relativeTime from "dayjs/plugin/relativeTime";
import { useBookingService } from "./bookingMachine.js";
dayjs.extend(relativeTime);

export default {
  props: ["description", "available", "id"],
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
    link: function () {
      return this.description.further;
    },
    notAvailable: function () {
      if (this.available) {
        return this.available.length < 1;
      }
      return true;
    },
    nextBookable: function () {
      if (!this.available) {
        return "No free slots available to book.";
      }
      if (this.available.length < 1) {
        return "No free slots available to book.";
      }
      let start = dayjs(this.available[0].start);
      return "Available " + start.fromNow();
    },
  },
  methods: {
    makeBooking() {
      let id = this.id;
      this.send({ type: "BOOKING", value: id });
      console.log("go to booking for", this.id);

      var path = "/slot/" + id;
      this.$router.push({ path: path });
    },
  },
  setup() {
    const { state, send } = useBookingService();
    return {
      state,
      send,
    };
  },
};
