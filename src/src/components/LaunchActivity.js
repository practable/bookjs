import DescribeActivity from "./describeActivity.vue";
import DescribeInterface from "./DescribeInterface.vue";

export default {
  props: ["activity"],
  components: {
    DescribeActivity,
    DescribeInterface,
  },
  computed: {
    userinterfaces: function () {
      if (!this.activity) {
        return "";
      }
      return this.activity.uis;
    },
    config: function () {
      if (!this.activity) {
        return "";
      }
      return this.activity.config;
    },
    streams: function () {
      if (!this.activity) {
        return "";
      }
      return this.activity.streams;
    },
    exp: function () {
      if (!this.activity) {
        return "";
      }
      return this.activity.exp;
    },
    dataloaded: function () {
      if (!this.activity) {
        return "";
      }
      return this.activity != {};
    },
  },
  mounted() {
    var path = "/";
    if (!this.activity) {
      this.$router.push({ path: path });
    }
  },
};
