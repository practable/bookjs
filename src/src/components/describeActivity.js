import dayjs from "dayjs";
import { mapGetters } from "vuex";

export default {
  props: ["description", "id"],
  computed: {
    title: function () {
      console.log("name", this.id);
      this.description.name;
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
    /* description: function () {
      console.log("describeActivity:", this.id);
      var id = this.id;
      console.log(this.getBookingByID(id));
      return this.getBookingByID(id);
    },*/
    dataloaded: function () {
      console.log("dataLoaded");
      return this.description != {};
    },
    ...mapGetters(["getBookingByID"]),
  },
};
