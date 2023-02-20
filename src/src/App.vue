<script>
  import { defineComponent } from "vue";
  import Booking from "./components/Booking.vue";
  import { provideBookingService } from "./components/bookingMachine.js"

export default defineComponent({
  components: { Booking },
      setup() {
          provideBookingService();
      },
  });
  
</script>

<!--MIT licensed SVG icons from https://heroicons.com/-->

<template>
<template v-if="true">
  <img width="300" src="https://dev.practable.io/static/images/common/practable-logo-3-1980x660.png">
 <p style="margin-bottom:0.4cm;"></p>
  <div id="nav">
	<router-link to="/">
	  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightslategrey" class="w-6 h-6" width="3%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
	  </svg>
	</router-link>

	
		<!--router-link to="/tickets">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightslategrey" class="w-6 h-6" width="3%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 6v.75m0 3v.75m0 3v.75m0 3V18m-9-5.25h5.25M7.5 15h3M3.375 5.25c-.621 0-1.125.504-1.125 1.125v3.026a2.999 2.999 0 010 5.198v3.026c0 .621.504 1.125 1.125 1.125h17.25c.621 0 1.125-.504 1.125-1.125v-3.026a2.999 2.999 0 010-5.198V6.375c0-.621-.504-1.125-1.125-1.125H3.375z" />
</svg>
		</router-link-->
		
	<router-link to="/user">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightslategrey" class="w-6 h-6" width="3%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
</svg>
	</router-link>


		<router-link to="/about">
	  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="lightslategrey" class="w-6 h-6" width="3%" length="auto">
  <path stroke-linecap="round" stroke-linejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-9 5.25h.008v.008H12v-.008z" />
</svg>
	</router-link>

  </div>
 <p style="margin-bottom:0.7cm;"></p>
	
  <router-view />

</template>

<template v-else>
<Booking />
</template>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>


