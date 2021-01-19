import dayjs from "dayjs";
import describeActivity from "./describeActivity.vue";
import { mapGetters } from "vuex";

export default {
  props: ["id"],
  components: {
    "describe-activity": describeActivity,
  },
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
      return this.description != {};
    },
    description: function () {
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
