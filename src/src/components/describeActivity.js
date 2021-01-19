import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  props: ["description", "id"],
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
      return "Now until " + dayjs.unix(this.description.exp).format("h:mm A");
    },
    dataloaded: function () {
      console.log("dataLoaded");
      return this.description != {};
    },
    ...mapGetters(["getBookingByID"]),
  },
};
