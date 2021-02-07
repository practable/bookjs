import dayjs from "dayjs";
import describeActivity from "./describeActivity.vue";
import describeUI from "./describeUI.vue";

import { mapGetters } from "vuex";

export default {
  props: ["id", "setTimer"],
  components: {
    "describe-activity": describeActivity,
    "describe-ui": describeUI,
  },
  computed: {
    userinterfaces: function () {
      return this.booking.uis;
    },
    streams: function () {
      return this.booking.streams;
    },
    exp: function () {
      return this.booking.exp;
    },
    dataloaded: function () {
      return this.booking != {};
    },
    booking: function () {
      var id = this.id;
      return this.getBookingByID(id);
    },
    ...mapGetters(["getBookingByID"]),
  },
  methods: {
    open() {
      console.log("opening ui page for  ", this.description.id);
    },
  },
};
