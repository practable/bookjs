<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";

import BookingSlots from "./BookingSlots.vue";
import YourBookings from "./YourBookings.vue";
import ChooseTime from "./ChooseTime.vue";
import DisplayBookingResponse from "./DisplayBookingResponse.vue";
import LaunchActivity from "./LaunchActivity.vue";
import Status from "./Status.vue";
import StartUp from "./StartUp.vue";

export default defineComponent({
name: "Booking",
components: {
    BookingSlots,
    YourBookings,
    ChooseTime,
    DisplayBookingResponse,
    LaunchActivity,
	Status,
	StartUp,
},
computed: {
    filteredSlots() {
      var filter = this.slotFilter.toLowerCase();
      var items = state.context.slots;

      items.sort((a, b) => (a.name > b.name ? 1 : -1));

      if (filter == "") {
        return items;
      }
      var results = items.filter((obj) => {
        return obj.name.toLowerCase().includes(filter);
      });

      return results;
    },
    slotsComplete() {
      console.log(state.context);
      return { not: "implemented" };
    },
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

  <start-up />
  
 <template v-if="state.context.status.locked">
	<status />
 </template>
 
<template v-else>
	  
  <template v-if="state.value === 'login'">
    <div>Logging in ...</div>
  </template>
  
  <template v-if="state.value === 'bookings'">
    <div>Getting bookings ...</div>
  </template>
	  
  <template v-else>
	<status />
	<your-bookings></your-bookings >
	<booking-slots></booking-slots >
	</template>
  	
  </template>
  
</template>

