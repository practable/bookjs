<template>
  <div class="container-fluid">
  <div class="bg-secondary row mb-2">
	<div class="col">
      <h3 class="text-white text-left">Your Bookings</h3>
      <!--h6 class="text-white text-left"><button v-if="!disableRefresh" class="btn btn-light" @click="getStatus()" :disabled="disableRefresh">refresh</button> {{ status }}</h6--> 
    </div>
	<div class="col">
	</div>
	<div class="col">
	</div>
  </div>
  <div class="row">
  <display-booking
  v-for="(booking,key) in bookings"
  :key="key"
  :booking="booking">
  </display-booking>
  </div>
</div>
</template>
<script src="./YourBookings.js"></script>
