import { mapState } from "vuex";
import mustache from "mustache";
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
        targets = {};
        for (i = 0; i < results.length; i++) {
          targets[keys[i]] = results[i].data.uri;
        }
        console.log(targets);
        var values = {
          dw: encodeURIComponent(targets.data),
          vw: encodeURIComponent(targets.video),
        };
        console.log(values);
        var template = this.ui.url;
        console.log("template", template);
        var rendered = mustache.render(template, values);
        console.log("rendered", rendered);
        window.open(rendered, "_blank");
      });
    },
    getCode(url, token) {
      this.targets = {};

      console.log("result", result);
      return result;
    },
  },
};
