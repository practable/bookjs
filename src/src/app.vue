<template>
  <enterToken />
  <displayBearer />
  <displayPools />
</template>

<script>
import displayBearer from "./components/displayBearer.vue";
import enterToken from "./components/enterToken.vue";
import displayPools from "./components/displayPools.vue";

export default {
  name: "App",
  components: {
    displayBearer,
      enterToken,
	  displayPools
  },
};
</script>
