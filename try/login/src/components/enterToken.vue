<template>
<button @click="quickToken">get token</button>
<input :value="token" @input="updateToken" >
  <button @click="bookingLogin">login</button>
  <button @click="deleteToken">clear</button>
  <div v-if="valid">Our login token is valid until {{ when }}</div>
  <div v-if="!valid">Token invalid because {{ result }}</div>
  <div	v-if="valid">Token: {{ loginToken }}</div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import axios from "axios";
import moment from 'moment';

export default {
  data() {
      return {
		stuff: null,
		expiresAt: null,
		loginToken: null,
		result: "empty",
		valid: false
    };

  
  },
	computed: {
		when: function() {
			return moment(this.expiresAt * 1000).format("MM/DD/YYYY hh:mm:ss")
		},
    ...mapState({
      token: (state) => state.token,
    }),
  },
	methods: {
		quickToken(){
			this.$store.commit("setToken","eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJncm91cHMiOlsiZ3JvdXAxIiwiZ3JvdXAyIiwiZ3JvdXAzIl0sInNjb3BlcyI6WyJsb2dpbjphZG1pbiJdLCJwb29scyI6W10sImF1ZCI6Imh0dHA6Ly9bOjpdOjQwMDAiLCJleHAiOjE2MTExOTI3NzcsImlhdCI6MTYxMDgzMjc3NywibmJmIjoxNjEwODMyNzc3fQ.bXTzjpf9tdxassgJYXEvCmz1i01_1owkio1VjXoLyKQ")
		},
    updateToken(e) {
      this.$store.commit("setToken", e.target.value);
    },
    bookingLogin() {
 
      axios
        .post(
          "http://[::]:4000/api/v1/login",
			{},
			
          {
            headers: {
				Authorization: this.token,
            },
          }
        )
			.then((response) => {

				this.stuff = response.data
				this.expiresAt = response.data.exp
				this.loginToken = response.data.token
				this.result = response.statusText
				this.valid = true


			}, (error) => {

				if (error.response) {
					this.valid = false
					this.loginToken = ""
		  this.result = error.response.statusText
	  } else {
		  this.result = "error"
		  this.valid = false
	  }

  });
    },
    ...mapActions(["login", "deleteToken"]),
  },
};
</script>
