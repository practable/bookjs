<template>
  <div id="nav">
	<router-link to="/">Home</router-link> |
	<router-link to="/about">About</router-link>
  </div>
  <router-view />

  </template>



<!---template>
  <div class="container">

  <img width="300" src="http://localhost:8008/images/booking/practable-logo-1980x660.png">
  <p style="margin-bottom:1cm;"></p>
<enterToken />
<p style="margin-bottom:1cm;"></p>
<displayBookings />
<p style="margin-bottom:1cm;"></p>
  <displayPools />

  </div>
</template--->

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
