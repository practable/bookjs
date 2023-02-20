<template>
	
  <div class="container-fluid">
  <div class="row mb-2">
	<div class="col">
      <h4 class="bg-light" >{{ duration }}</h4>
	     </div>
	</div>	
	  <div class="row">
		
<display-time 
  v-for="(time,key) in times"
  :key="key"
  :slot="slot"
  :time="time">
</display-time>
 
  </div>
	</div>	

</template>
<script src="./DisplayTimes.js"></script>
