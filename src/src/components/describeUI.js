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
      // make api calls ....
      console.log(this.ui);
      this.getCode(this.streams[0].url, this.streams[0].token);
      // do template
      console.log("streams", this.streams);
      var template = this.ui.url;

      console.log("open", template);
    },
    getCode(url, token) {
      axios
        .post(
          url,
          {},
          {
            headers: {
              Authorization: token,
            },
          }
        )
        .then(
          (response) => {
            console.log(response.data);
            return {
              ok: true,
              code: response.data,
            };
          },
          (error) => {
            console.log(error.response.data);
            return {
              ok: false,
              code: error.response.data,
            };
          }
        );
    },
  },
};
