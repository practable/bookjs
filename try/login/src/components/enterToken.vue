<template>
  <input :value="token" @input="updateToken" />
  <button @click="login">login</button>
  <button @click="deleteToken">clear</button>
  <button @click="getSomething">getSomething</button>
  <div>What we got: {{ stuff }}</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";

export default {
  data() {
    return {
      stuff: null,
    };
  },
  computed: {
    ...mapState({
      token: (state) => state.token,
    }),
  },
  methods: {
    updateToken(e) {
      this.$store.commit("setToken", e.target.value);
    },
    getSomething() {
      console.log("getSomething() called");

      /*axios
        .get("https://api.npms.io/v2/search?q=vue")
        .then((response) => (this.stuff = response.data.total));
	  */
      axios
        .post(
          "http://[::]:4000/api/v1/login",
          {},
          {
            headers: {
              Authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiZ3JvdXAxIiwiZ3JvdXAyIiwiZ3JvdXAzIl0sInNjb3BlcyI6WyJsb2dpbjphZG1pbiJdLCJwb29scyI6W10sImF1ZCI6Imh0dHA6Ly9bOjpdOjQwMDAiLCJleHAiOjE2MTExOTI3NzcsImlhdCI6MTYxMDgzMjc3NywibmJmIjoxNjEwODMyNzc3fQ.bXTzjpf9tdxassgJYXEvCmz1i01_1owkio1VjXoLyKQ",
            },
          }
        )
        .then((response) => (this.stuff = response));
    },
    ...mapActions(["login", "deleteToken"]),
  },
};
</script>
