import { mapState } from "vuex";
import mustache from "mustache";
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
      var template = this.ui.url;
      var streams, encodedStreams;
      var rendered;

      try {
        streams = JSON.stringify(this.streams);
      } catch (e) {
        console.log(e, "could not stringify streams - try without!");
        rendered = mustache.render(template, { streams: "" });
        window.open(rendered, "_blank");
        return;
      }

      try {
        encodedStreams = encodeURIComponent(streams);
      } catch (e) {
        console.log(e, "could not uriEncode streams - try without!");
        rendered = mustache.render(template, { streams: streams });
        window.open(rendered, "_blank");
        return;
      }

      try {
        rendered = mustache.render(template, { streams: encodedStreams });
      } catch (e) {
        console.log("error rendering uri, try unrendered version", e);
        window.open(template, "_blank");
        return;
      }

      window.open(rendered, "_blank");
    },
  },
};
