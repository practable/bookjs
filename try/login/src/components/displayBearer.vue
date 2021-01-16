<template>
  <div>Value: {{ bearer }}</div>
  <button @click="deleteBearer">clear</button>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  computed: mapGetters(["bearer"]),
  methods: mapActions(["deleteBearer"]),
};
</script>
