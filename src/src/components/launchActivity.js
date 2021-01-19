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
      console.log("launchActivity:dataloaded", this.description);
      return this.description != {};
    },
    description: function () {
      console.log("launchActivity:description:id", this.id);
      var id = this.id;
      console.log("launchActivity:description", this.getBookingByID(id));
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
