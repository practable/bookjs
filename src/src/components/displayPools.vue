<template>
  
<div class="container-fluid">
  <div class="bg-secondary row mb-2">
	<div class="col">
      <h3 class="text-white text-left">Your Catalogue</h3>
      <h6 class="text-white text-left">{{ status }}</h6>
    </div>
	<div class="col">
	</div>
	<div class="col"></div>
  </div>
  <div class="row">
  	  <input v-model="poolFilter" placeholder="filter...">
  </div>
  <div class="row">
  <describe-pool
  v-for="(item, index) in filteredDetails"
  :description="item"
  :index="index"
  :key="item.id"
	></describe-pool>
  </div>
</div>
</template>

<script src="./displayPools.js"></script>
