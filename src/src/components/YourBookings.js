import YourBooking from "./YourBooking.vue";
import DisplayBooking from "./DisplayBooking.vue";
import { useBookingService } from "./bookingMachine.js";

export default {
  props: [],
  components: {
    YourBooking,
    DisplayBooking,
  },
  computed: {
    bookings() {
      return this.state.context.bookings;
    },
    filteredBookings() {
      var filter = this.filter.toLowerCase();
      var items = Object.entries(this.bookings);

      //each item is an array with two elements [0] key and [1] object
      items.sort((a, b) => (a[0] > b[0] ? 1 : -1));

      if (filter == "") {
        return Object.fromEntries(items);
      }
      let results = items.filter((obj) => {
        return obj[1].description.name.toLowerCase().includes(filter);
      });

      return Object.fromEntries(results);
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
