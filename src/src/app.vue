<template>
  <img width="300" src="http://localhost:8008/images/booking/practable-logo-1980x660.png">
  <p style="margin-bottom:1cm;"></p>
<enterToken />
  <p style="margin-bottom:1cm;"></p>
<displayPools />
</template>

<script>
import displayBearer from "./components/displayBearer.vue";
import enterToken from "./components/enterToken.vue";
import displayPools from "./components/displayPools.vue";
import poolDescription from "./components/poolDescription.vue";

export default {
  name: "App",
  components: {
    displayBearer,
      enterToken,
	  displayPools,
	  poolDescription,
  },
};
</script>
