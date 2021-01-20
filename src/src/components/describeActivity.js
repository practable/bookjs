import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  props: ["booking", "id"],
  computed: {
    title: function () {
      if (this.booking.hasOwnProperty("description")) {
        return this.booking.description.name;
      } else {
        return "";
      }
    },
    image: function () {
      if (this.booking.hasOwnProperty("description")) {
        return this.booking.description.image;
      } else {
        return "";
      }
    },
    what: function () {
      if (this.booking.hasOwnProperty("description")) {
        return this.booking.description.short;
      } else {
        return "";
      }
    },
    about: function () {
      if (this.booking.hasOwnProperty("description")) {
        return this.booking.description.long;
      } else {
        return "";
      }
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
