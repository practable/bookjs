import BookingSlot from "./BookingSlot.vue";
import dayjs from "dayjs/esm/index.js";
import { useBookingService } from "./bookingMachine.js";

export default {
  props: [],
  components: {
    BookingSlot,
  },
  computed: {
    slots() {
      return this.state.context.completeSlots;
    },
    filteredSlots() {
      var filter = this.filter.toLowerCase();
      var items = Object.entries(this.slots);

      //each item is an array with two elements [0] key and [1] object
      items.sort((a, b) => (a[0] > b[0] ? 1 : -1));

      let results = items;

      if (filter != "") {
        results = items.filter((obj) => {
          return obj[1].description.name.toLowerCase().includes(filter);
        });
      }

      // split the array into available now, available sometime, and not available
      let soon = [];
      let later = [];
      let never = [];

      let now = dayjs().add(1, "minute");

      function categorise(item) {
        const a = item[1].available;

        if (Array.isArray(a)) {
          if (a.length < 1) {
            never.push(item);
          } else {
            const start = a[0].start;

            if (dayjs(start).isBefore(now)) {
              soon.push(item);
            } else {
              later.push(item);
            }
          }
        } else {
          never.push(item);
        }
      }

      results.forEach(categorise);

      const categorisedResults = soon.concat(later).concat(never);

      return Object.fromEntries(categorisedResults);
    },
  },
  data() {
    return {
      filter: "",
      disableRefresh: true,
    };
  },
  setup() {
    const { state, send } = useBookingService();
    return {
      state,
      send,
    };
  },
};
