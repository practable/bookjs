<template>
  <div class="container-fluid">

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
