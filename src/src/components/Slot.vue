<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";
import ChooseTime from "./ChooseTime.vue";
import DisplayBookingResponse from "./DisplayBookingResponse.vue";

export default defineComponent({
name: "Slot",
components: {
    ChooseTime,
	DisplayBookingResponse,
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
<template v-if="state.value === 'bookingResponse'">
  	<display-booking-response
	  :response="state.context.bookingResponse">
	  </display-booking-response>
  </template>
<template v-else>
	<choose-time
	  :slot="state.context.completeSlots[state.context.slotSelected]">
	  </choose-time>
</template>
</template>
