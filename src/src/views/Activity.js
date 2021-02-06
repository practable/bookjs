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
    finished: function () {
      var id = this.id;
      if (!id) {
        return false;
      }

      var isFinished = this.getFinishedByID(id);

      if (isFinished) {
        this.$router.back();
      }
      return isFinished;
    },
    ...mapGetters(["getFinishedByID"]),
  },
  watch: {
    $route(to, from) {
      console.log("Activity:", to, from);
    },
    finished(now, before) {
      console.log("watching finish, now=", now, "before=", before);
      if (now) {
        this.$router.back();
      }
    },
  },
};
