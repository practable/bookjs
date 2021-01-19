<template>
<div class="container-fluid">
  <div class="bg-primary text-left">
<h3 class="text-white">Your Bookings</h3>
<h6 class="text-white">{{ status }}</h6>
  </div>
  <div class="container-fluid">
  <div class="row">
<booking-description
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
  ></booking-description>
  </div>
  </div>
</div>
</template>

<script src="./displayBookings.js"></script>
