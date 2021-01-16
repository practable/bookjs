<template>
  <div>Value: {{ bearer }}</div>
  <button @click="login">login</button>
  <button @click="clear">clear</button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["bearer"]),
  methods: mapActions(["login", "clear"]),
};
</script>
