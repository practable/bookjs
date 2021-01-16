<template>
  <input :value="token" @input="updateToken" />
  <button @click="login">login</button>
  <button @click="deleteToken">clear</button>
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
      this.$store.commit("setToken", e.target.value);
    },
    ...mapActions(["login", "deleteToken"]),
  },
};
</script>
