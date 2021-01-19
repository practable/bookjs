<template>
<div class="container-fluid">
  <div class="bg-secondary">
<h3 class="text-white text-left">Your Catalogue</h3>
<h6 class="text-white text-left">{{ status }}</h6>
  </div>
  <div class="container-fluid">
  <div class="row">
  <describe-pool
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
	></describe-pool>
  </div>
  </div>
</div>
</template>

<script src="./displayPools.js"></script>
