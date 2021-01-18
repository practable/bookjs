<template>
  <div id="nav">
	<router-link to="/">Home</router-link> |
	<router-link to="/login">Login</router-link> |
	<router-link to="/about">About</router-link>
	
  </div>
  <router-view />

  </template>
<script>
import displayBearer from "./components/displayBearer.vue";
import enterToken from "./components/enterToken.vue";
import displayPools from "./components/displayPools.vue";
import poolDescription from "./components/poolDescription.vue";
import displayBookings from "./components/displayBookings.vue";

export default {
  name: "App",
  components: {
    displayBearer,
      enterToken,
	  displayPools,
	  poolDescription,
	  displayBookings,
  },
};
</script>
