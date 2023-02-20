<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";

import BookingSlots from "./BookingSlots.vue";
import YourBookings from "./YourBookings.vue";
import ChooseTime from "./ChooseTime.vue";
import DisplayBookingResponse from "./DisplayBookingResponse.vue";
import LaunchActivity from "./LaunchActivity.vue";

export default defineComponent({
name: "Booking",
components: {
    BookingSlots,
    YourBookings,
    ChooseTime,
    DisplayBookingResponse,
    LaunchActivity,
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
<template v-if="false">
{{ state }}
</template>
<template v-else>
  <template v-if="state.value === 'login'">
    <div>Logging in ...</div>
  </template> 
  <template v-if="state.value === 'bookings'">
    <div>Getting bookings ...</div>
  </template>
  <template v-if="state.value === 'notused'">  
    <div> Your groups {{ state.context.groups }}.</div>
	<div> Your bookings {{ state.context.bookings }}.</div>
	<button @click="send({type:'SELECT',name:'g-everyone'})">Get g-everyone details</button>
  </template>

  <template v-if="state.value === 'groups'">
<h4> Your bookings:  </h4>
	<div> Your bookings {{ state.context.bookings }}</div>
    <h4> Your groups:  </h4>
	<li v-for="group in state.context.groups">
	  {{ group.description.name }} : {{ group.description.short }}
	</li>
  </template>

  <template v-if="state.value === 'idle'">
	
	<your-bookings></your-bookings>
	<booking-slots></booking-slots>
  	
  </template> 
  <template v-if="state.value === 'booking'">
<!--	Make a booking here for {{ state.context.slotSelected }}
	{{ state.context.completeSlots[state.context.slotSelected] }}-->
	<choose-time
	  :slot="state.context.completeSlots[state.context.slotSelected]">
	  </choose-time>
  </template>

   <template v-if="state.value === 'bookingResponse'">
<!--	Make a booking here for {{ state.context.slotSelected }}
	{{ state.context.completeSlots[state.context.slotSelected] }}-->
	<display-booking-response
	  :response="state.context.bookingResponse">
	  </display-booking-response>
   </template>

    <template v-if="state.value === 'activityResponse'">
<!--	Make a booking here for {{ state.context.slotSelected }}
	{{ state.context.completeSlots[state.context.slotSelected] }}
	<display-booking-response
	  :response="state.context.activityResponse">
	</display-booking-response>-->

	<launch-activity
	  :activity="state.context.activityResponse.results">
	  </launch-activity>
   </template>  
	
  <template v-if="state.value === 'displayGroup'">
	<div> user: {{ state.context.userName }} </div>
	<div> token: {{ state.context.token }} </div>
    <div> Your groups {{ state.context.groups }}.</div>
	<div> Your bookings {{ state.context.bookings }}.</div>
	<div> g-everyone selected: {{ state.context.groupDetails}} </div>

  </template>
  
</template>
</template>
<!--script src="./bookingMachine.js"></script-->
