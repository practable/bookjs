import { mapState } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import $ from "jquery";
export default {
  props: ["ui"],
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
};
