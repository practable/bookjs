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

      axios
        .get("https://api.npms.io/v2/search?q=vue")
        .then((response) => (this.stuff = response.data.total));

      /*
		const { response, error, loading, uploadProgress, exec } = useAxios()

	  await exec({
        url: 'https://rickandmortyapi.com/api/character',
        method: 'get'
      })
	console.log(	await !error.value ? await response.value : null)
*/
    },
    ...mapActions(["login", "deleteToken"]),
  },
};
</script>
