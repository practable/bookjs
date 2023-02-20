<template>
  <div class="container-fluid">
  <div class="bg-secondary row mb-2">
	<div class="col">
      <h3 class="text-white text-left">Your Catalogue</h3>
      <!--h6 class="text-white text-left"><button v-if="!disableRefresh" class="btn btn-light" @click="getStatus()" :disabled="disableRefresh">refresh</button> {{ status }}</h6--> 
    </div>
	<div class="col">
	</div>
	<div class="col">

	</div>
  </div>
  <div class="row">
  	  <input v-model="filter" placeholder="filter...">
  </div>
  <div class="row">
  <booking-slot
	v-for="(slot,key) in filteredSlots"
	:key="key"
	:description="slot.description"
	:available="slot.available"
	:id="slot.id">
  </booking-slot>
 
  </div>
</div>
</template>
<script src="./BookingSlots.js"></script>
