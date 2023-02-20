<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";

import LaunchActivity from "./LaunchActivity.vue";

export default defineComponent({
name: "Activity",
components: {
    LaunchActivity,
},
  setup() {
    const { state, send } = useBookingService();
    return {
      state,
      send,
    };
  },
});
</script>

<template>

  <template v-if="state.value === 'idle'">
     <launch-activity
	  :activity="state.context.activityResponse.results">
	  </launch-activity>
	</template>

  <template v-else>
	  Loading ...
  </template>
	

</template>
