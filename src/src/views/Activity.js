import launchActivity from "../components/launchActivity.vue";
import { mapGetters } from "vuex";

export default {
  name: "Activity",
  components: {
    "launch-activity": launchActivity,
  },
  computed: {
    id: function () {
      console.log("activity:id:", this.$route.params.id);
      return this.$route.params.id;
    },
    dataloaded: function () {
      return this.description != {};
    },
    ...mapGetters(["getBookingByID"]),
    description: function () {
      console.log("Activity:description:id:", this.$route.params.id);
      var id = this.$route.params.id;
      return this.getBookingByID(id);
    },
  },
  watch: {
    $route(to, from) {
      console.log("Activity:", to, from);
    },
  },
};
