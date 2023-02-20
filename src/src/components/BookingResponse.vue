<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";
import DisplayBookingResponse from "./DisplayBookingResponse.vue";

export default defineComponent({
name: "BookingResponse",
components: {
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
  	<display-booking-response
	  :response="state.context.bookingResponse">
	  </display-booking-response>
</template>

