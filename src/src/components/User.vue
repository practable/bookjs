<script>
import { defineComponent } from "vue";
import { useBookingService } from "./bookingMachine.js";

import Status from "./Status.vue";

export default defineComponent({
name: "User",
components: {
	Status,
},
	computed: {},
	 mounted() {
    var path = "/";
    if (this.state.context.status.startup) {
      this.$router.push({ path: path });
    }
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
  
 <template v-if="state.context.status.locked">
	<status />
 </template>
 
<template v-else>
	  
  <status />
 <div class="container-fluid">
   <div class="bg-secondary row mb-2">
	 	<div class="col" />
	<div class="col">
      <h3 class="text-white text-left">Your Settings</h3>
      <!--h6 class="text-white text-left"><button v-if="!disableRefresh" class="btn btn-light" @click="getStatus()" :disabled="disableRefresh">refresh</button> {{ status }}</h6--> 
    </div>


	<div class="col" />

  </div>
 </div>
  <p style="margin-bottom:0.4cm;"></p>
 <h4> Username  </h4>
 {{ state.context.userName }}
  <p style="margin-bottom:0.4cm;"></p>
 <h4> Groups </h4>
 <li v-for="item in state.context.groupNames">
  {{ item }}
 </li>
  <p style="margin-bottom:0.4cm;"></p>
 <h4> Sessions </h4>
 <li v-for="item in state.context.sessionNames">
  {{ item }}
</li>

</template>
  
</template>

