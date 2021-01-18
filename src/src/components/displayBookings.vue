<template>
<div class="container">
  <div class="bg-primary" style="max-width: 540px;">
<h3 class="text-white">Your Bookings</h3>
<h6 class="text-white">{{ status }}</h6>
</div>
<booking-description
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
  ></booking-description>
 </div>
</template>

<script src="./displayBookings.js"></script>
