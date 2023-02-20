<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";

import dayjs from "dayjs/esm/index.js";

export default defineComponent({
	name: "Status",
	computed: {
		now: function (){
			if (this.state.context.status && this.state.context.status.hasOwnProperty("now")){
			return dayjs(this.state.context.status.now).format("ddd DD MMM HH:mm")
			}
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

  <template v-if="state.context.status.startup">
	   <div class="bg-warning row mb-2">

	 <div class="col-md-auto" >
	   
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" width="15%" length="auto">
   <path stroke-linecap="round" stroke-linejoin="round" d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z" />
</svg>

	 </div>

	 
<div class="col-8">
     <h4 class="text-white text-left"> {{ now }}  {{ state.context.status.message }} </h4>
	 </div>
 
</div>
  
</template>

  <template v-else >
  <template v-if="state.context.status.locked">

	
<div class="container-fluid">
   <div class="bg-danger row mb-2">

	 <div class="col-md-auto" >
	   
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" width="15%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
</svg>

	 </div>

	 
<div class="col-8">
     <h4 class="text-white text-left"> {{ now }}  {{ state.context.status.message }} </h4>
	 </div>
 
</div>
 </div> 
  </template>
  <template v-else >
	
<div class="container-fluid">
   <div class="bg-success row mb-2">

	 <div class="col-md-auto" >
	   
	 <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="white" class="w-6 h-6" width="15%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 12.75l6 6 9-13.5" />
	 </svg>

	 </div>

	 
<div class="col-8">
     <h4 class="text-white text-left"> {{ now }}  {{ state.context.status.message }} </h4>
	 </div>
 
</div>
 </div> 
</template>
</template>
</template>
