import launchActivity from "../components/launchActivity.vue";
import { mapGetters } from "vuex";

export default {
  name: "Activity",
  components: {
    "launch-activity": launchActivity,
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    },
  },
  watch: {
    $route(to, from) {
      console.log("Activity:", to, from);
    },
  },
};
