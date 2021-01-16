<template>
  <enterToken />
  <displayBearer />
</template>

<script>
import displayBearer from "./components/displayBearer.vue";
import enterToken from "./components/enterToken.vue";

export default {
  name: "App",
  components: {
    displayBearer,
    enterToken,
  },
};
</script>
