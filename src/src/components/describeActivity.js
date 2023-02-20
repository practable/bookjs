import dayjs from "dayjs";

export default {
  props: ["activity"],
  computed: {
    title: function () {
      if (this.activity.hasOwnProperty("description")) {
        return this.activity.description.name;
      } else {
        return "";
      }
    },
    image: function () {
      if (this.activity.hasOwnProperty("description")) {
        return this.activity.description.image;
      } else {
        return "";
      }
    },
    what: function () {
      if (this.activity.hasOwnProperty("description")) {
        return this.activity.description.short;
      } else {
        return "";
      }
    },
    about: function () {
      if (this.activity.hasOwnProperty("description")) {
        return this.activity.description.long;
      } else {
        return "";
      }
    },
    status: function () {
      return (
        dayjs.unix(this.activity.nbf).format("ddd D MMM HH:mm") +
        " - " +
        dayjs.unix(this.activity.exp).format("HH:mm")
      );
    },
    dataloaded: function () {
      return this.activity != {};
    },
  },
};
