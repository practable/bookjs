import dayjs from "dayjs/esm/index.js";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default {
  props: ["booking"],
  components: {},
  computed: {
    /*
    title: function () {
      return this.description.name;
    },
    image: function () {
      return this.description.image;
    },
    id: function () {
      return this.description.id;
    },
    what: function () {
      return this.description.short;
    },
    about: function () {
      return this.description.long;
      },*/
  },
  methods: {
    //TODO emit event here to get activity
  },
};

//TODO watch for activity coming into time ...
