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
		// two edge cases need handling
		// we arrive here from an old link and this.activity will never be valid
		// we arrive here on our first activity after refreshing the page, and it's not propagated here yet
		// solution - if invalid, wait, then check again, and return if still invalid, else, ignore
		
      if (!this.activity) {
		  setTimeout(() => {
			  if (!this.activity) {
				  this.$router.push({ path: "/"});
			  }
		  }, "1000");
		  
    }
  },
};
