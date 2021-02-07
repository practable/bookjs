import launchActivity from "../components/launchActivity.vue";
import { mapGetters } from "vuex";

export default {
  name: "Activity",
  components: {
    "launch-activity": launchActivity,
  },
  data() {
    return {
      timerSet: false,
    };
  },
  computed: {
    id: function () {
      return this.$route.params.id;
    },
    setTimer: function () {
      var id = this.id;
      if (!id) {
        return false;
      }

      var timeLeft = this.getTimeLeftByID(id);

      if (timeLeft > 0 && !this.timerSet) {
        console.log("setting Timer for ", timeLeft);
        setTimeout(this.goBack, timeLeft * 1000);
        this.timerSet = true;
        return true;
      }

      return this.timerSet;
    },
    ...mapGetters(["getTimeLeftByID"]),
  },
  methods: {
    goBack() {
      console.log("going back");
      this.$router.back();
    },
  },
  watch: {
    $route(to, from) {
      console.log("Activity:", to, from);
    },
  },
};
