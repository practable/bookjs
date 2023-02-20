import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";
import { useRoute } from "vue-router";

export default defineComponent({
  name: "StartUp",
  components: {},
  computed: {},
  mounted() {
    //repeated query param keys are mixing the results so don't do that
    let gn = ["g-everyone"]; //default group
    let sn = [];

    // example of query params - use JSON format for arrays, including quotes
    //?groups=["g-a","g-b"]&sessions=["s-a"]&group=g-c&session=s-b

    if (this.route.query.groups) {
      gn = JSON.parse(this.route.query.groups);
    }
    if (this.route.query.sessions) {
      sn = JSON.parse(this.route.query.sessions);
    }

    if (this.route.query.group) {
      gn.push(this.route.query.group);
    }
    if (this.route.query.session) {
      sn.push(this.route.query.session);
    }

    let sg = {
      groupNames: gn,
      sessionNames: sn,
    };

    this.send({ type: "STARTUP", data: sg });
  },
  setup() {
    const { state, send } = useBookingService();
    const route = useRoute();
    return {
      state,
      send,
      route,
    };
  },
});
