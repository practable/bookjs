import DisplayBooking from "./DisplayBooking.vue";
import { useBookingService } from "./bookingMachine.js";

export default {
  props: [],
  components: {
      DisplayBooking,
  },
  computed: {
    bookings() {
      var items = Object.entries(this.state.context.bookings);
      
      //each item is an array with two elements [0] key and [1] object
      items.sort((a, b) => (a[0] > b[0] ? 1 : -1));

      return Object.fromEntries(items);
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
