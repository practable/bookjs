import { mapActions, mapState } from "vuex";
import axios from "axios";
import dayjs from "dayjs";
import $ from "jquery";

export default {
  props: ["description", "key", "index"],
  components: {},
  computed: {
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
    },
    status: function () {
      var _this = this;
      setTimeout(function () {
        _this.$store.commit("deleteBooking", _this.description);
      }, 1000 * (this.description.exp - dayjs().unix()));
      return "Now until " + dayjs.unix(this.description.exp).format("h:mm A");
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
      var path = "/activity/" + this.id;
      this.$router.push({ path: path });
    },
  },
};
