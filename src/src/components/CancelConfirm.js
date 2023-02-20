import { useBookingService } from "./bookingMachine.js";
import DisplayBooking from "./DisplayBooking.js";
import dayjs from "dayjs/esm/index.js";
export default {
  name: "CancelConfirm",
  props: ["booking"],
  components: {
    DisplayBooking,
  },
  computed: {
    description: function () {
      if (this.booking) {
        if (this.booking.slot) {
          if (this.state.context.slots[this.booking.slot]) {
            return this.state.context.slots[this.booking.slot].description;
          }
        }
      }
    },
    bookingNotStarted: function () {
      if (this.booking) {
        if (this.booking.hasOwnProperty("start")) {
          return this.now.isBefore(this.start);
        }
      }
    },
    title: function () {
      if (this.description) {
        return this.description.name;
      }
    },
    image: function () {
      if (this.description) {
        return this.description.image;
      }
    },
    what: function () {
      if (this.description) {
        return this.description.short;
      }
    },
    about: function () {
      if (this.description) {
        return this.description.long;
      }
    },
    link: function () {
      if (this.description) {
        return this.description.further;
      }
    },
    start: function () {
      if (this.booking) {
        if (this.booking.hasOwnProperty("when")) {
          return dayjs(this.booking.when.start);
        }
      }
      return dayjs();
    },
    end: function () {
      if (this.booking) {
        if (this.booking.hasOwnProperty("when")) {
          return dayjs(this.booking.when.end);
        }
      }
      return dayjs();
    },
  },
  data() {
    return {
      now: dayjs(),
    };
  },
  methods: {
    keep() {
      var path = "/";
      this.$router.push({ path: path });
    },
    cancel() {
      this.send({ type: "CANCELBOOKING", value: this.booking });
      console.log("cancel booking", this.booking.name, this.booking.slot);
      var path = "/";
      this.$router.push({ path: path });
    },
  },
  mounted() {
    var path = "/";
    if (Object.keys(this.booking).length === 0) {
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
