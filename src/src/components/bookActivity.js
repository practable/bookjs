import { mapState } from "vuex";

export default {
  components: {},
  data() {
    return {
      value: null,
    };
  },
  computed: {
    ...mapState({
      options: (state) => {
        var names;
        names = [];
        var i;
        for (i = 0; i < state.poolDescriptions.length; i++) {
          names.push(state.poolDescriptions[i].name);
        }
        console.log("updating options");
        return names;
      },
    }),
  },
};
