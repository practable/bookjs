<template>
  <div v-if="valid">Our booking token is valid until {{ when }}</div>
  <div v-if="!valid">Token {{ status }} because {{ result }}</div>
  <div	v-if="valid">Token: {{ bearer }}</div>
  
</template>

<script>
import moment from "moment";
import { mapState} from "vuex";
export default {
	computed:{
    ...mapState({
      token: (state) => state.token,
      bearer: (state) => state.bookingToken,
		valid: (state) => state.bookingTokenValid,
		status: (state) => state.bookingTokenStatus,
		result: (state) => state.loginResult,
		when: (state) => {return moment(state.bookingTokenExpiresAt * 1000).format('MMMM Do YYYY, h:mm:ss a')},
    }),
  },
};
</script>

