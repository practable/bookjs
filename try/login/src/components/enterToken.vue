<template>
  <input :value="token" @input="updateToken" />
  <button @click="login">login</button>
  <button @click="clearToken">clear</button>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },
  methods: {
    updateToken(e) {
      this.$store.commit("updateToken", e.target.value);
    },
    clearToken() {
      this.$store.commit("clearToken");
    },
    ...mapActions(["login"]),
  },
};
</script>
