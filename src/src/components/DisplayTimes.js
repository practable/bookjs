import DisplayTime from "./DisplayTime.vue";
import dayjs from "dayjs/esm/index.js";
import duration from "dayjs/plugin/duration";
import relativeTime from "dayjs/plugin/relativeTime";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
dayjs.extend(isSameOrBefore);
dayjs.extend(relativeTime);
dayjs.extend(duration);

export default {
  props: ["duration", "slot", "times"],
  components: {
    DisplayTime,
  },
  computed: {
    start: function () {
      return time.start;
    },
    end: function () {
      return time.end;
    },
  },
  data() {
    return {};
  },
};
