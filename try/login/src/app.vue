<template>
  <enterToken />
  <displayBearer />
  <displayStoreStatus />
</template>

<script>
import displayBearer from "./components/displayBearer.vue";
import enterToken from "./components/enterToken.vue";
import displayStoreStatus from "./components/displayStoreStatus.vue";

export default {
  name: "App",
  components: {
    displayBearer,
      enterToken,
	  displayStoreStatus
  },
};
</script>
