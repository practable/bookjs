import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  props: ["booking", "id"],
  computed: {
    title: function () {
      return this.booking.description.name;
    },
    image: function () {
      return this.booking.description.image;
    },
    what: function () {
      return this.booking.description.short;
    },
    about: function () {
      return this.booking.description.long;
    },
    status: function () {
      return "Now until " + dayjs.unix(this.booking.exp).format("h:mm A");
    },
    dataloaded: function () {
      return this.booking != {};
    },
    ...mapGetters(["getBookingByID"]),
  },
};
