<template>
  <div class="container">
	<img width="300" src="http://localhost:8008/images/booking/practable-logo-1980x660.png">
  <p style="margin-bottom:1cm;"></p>
  <enterToken />
	<p style="margin-bottom:1cm;"></p>
	<displayBookings />
	<p style="margin-bottom:1cm;"></p>
	<displayPools />
  </div>
</template>

<script>
  import enterToken from "../components/enterToken.vue";
  import displayBookings from "../components/displayBookings.vue";
  import displayPools from "../components/displayPools.vue";
export default {
  name: "Login",
  components: {
      enterToken,
	  displayPools,
	  displayBookings,
  },
};
</script>
