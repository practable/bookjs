import dayjs from "dayjs/esm/index.js";
import { ref } from "vue";
import relativeTime from "dayjs/plugin/relativeTime";
import { useBookingService } from "./bookingMachine.js";
dayjs.extend(relativeTime);

export default {
  props: ["booking"],
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
        return this.now.isBefore(this.start);
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
        return dayjs(this.booking.when.start);
      }
    },
    end: function () {
      if (this.booking) {
        return dayjs(this.booking.when.end);
      }
    },
    isSession: function () {
      if (this.booking) {
        return this.booking.isSession === true;
      }
    },
    session: function () {
      if (this.booking) {
        return this.booking.session;
      }
    },
  },
  data() {
    return {
      now: dayjs(),
    };
  },
  methods: {
    getActivity() {
      this.send({ type: "GETACTIVITY", value: this.booking });

      console.log(
        "get activity for booking",
        this.booking.name,
        this.booking.slot
      );

      var path = "/activity/" + this.booking.name;
      this.$router.push({ path: path });
    },

    cancelBooking() {
      this.state.context.bookingToCancel = this.booking;
      var path = "/cancelConfirm/" + this.booking.name;
      this.$router.push({ path: path });
    },
  },
  mounted() {
    // set a timer to update this.now 1 second after the booking has started...
    // this should enable the open button on demand
    this.now = dayjs();
    let later = dayjs(this.booking.when.start);
    let wait = dayjs.duration(later.diff(this.now)).add(1, "second");
    setTimeout(() => {
      this.now = dayjs();
      console.log("updated now for booking");
    }, wait.asMilliseconds());
  },
  setup() {
    const { state, send } = useBookingService();
    return {
      state,
      send,
    };
  },
};
