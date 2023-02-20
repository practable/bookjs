import mustache from "mustache";
export default {
  props: ["config", "exp", "streams", "ui"],
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
  },
  methods: {
    open() {
      var template = this.ui.url;
      var streams, encodedStreams;
      var rendered;
      var config = this.config;
      var encodedConfig;
      var expiry = this.exp;
      if (!config) {
        config = { url: "" }; //it's optional, and omitted when empty
      }
      try {
        streams = JSON.stringify(this.streams);
      } catch (e) {
        console.log(e, "could not stringify streams - try without!");
        rendered = mustache.render(template, { streams: "", exp: expiry });
        window.open(rendered, "_blank");
        return;
      }

      try {
        encodedStreams = encodeURIComponent(streams);
        encodedConfig = encodeURIComponent(config.url);
      } catch (e) {
        console.log(
          e,
          "could not uriEncode streams or config - try without encoding!"
        );

        rendered = mustache.render(template, {
          config: config.url,
          streams: streams,
          exp: expiry,
        });
        window.open(rendered, "_blank");
        return;
      }

      try {
        rendered = mustache.render(template, {
          config: encodedConfig,
          streams: encodedStreams,
          exp: expiry,
        });
      } catch (e) {
        console.log("error rendering uri, try unrendered version", e);
        window.open(template, "_blank");
        return;
      }

      window.open(rendered, "_blank");
    },
  },
};
