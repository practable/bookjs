import { mapState } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import $ from "jquery";
export default {
  props: ["ui", "streams"],
  components: {},
  computed: {
    title: function () {
      return this.ui.description.name;
    },
    image: function () {
      return this.ui.description.image;
    },
    what: function () {
      return this.ui.description.short;
    },
    about: function () {
      return this.ui.description.long;
    },
    ...mapState({
      bookingTokenValid: (state) => state.bookingTokenValid,
      bookingToken: (state) => state.bookingToken,
      poolStatus: (state) => state.poolStatus,
      details: (state) => state.poolDescriptions,
      ids: (state) => state.poolIDs,
    }),
  },
  methods: {
    open() {
      var targets = {};
      var streams = this.streams;
      var i;
      var testvariable = "helawelwlerlwelr";
      console.log(streams.length);
      var requests = [];
      var keys = [];

      for (i = 0; i < streams.length; i++) {
        keys.push(this.streams[i].for);
        var req = () =>
          axios
            .post(
              streams[i].url,
              {},
              { headers: { Authorization: streams[i].token } }
            )
            .catch((err) => null);
        requests.push(req());
      }

      axios.all(requests).then((results) => {
        console.log(results);
        console.log(keys);
        for (i = 0; i < results.length; i++) {
          console.log("individual result for", keys[i], results[i]);
        }
      });

      // make api calls ....
      //console.log(this.ui);
      //this.getCode(this.streams[0].url, this.streams[0].token);
      // do template
      //console.log("streams", this.streams);
      var template = this.ui.url;

      console.log("open", template);
    },
    getCode(url, token) {
      this.targets = {};

      console.log("result", result);
      return result;
    },
  },
};
