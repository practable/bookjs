<template>
  <div class="bg-primary" style="max-width: 540px;">
<h3 class="text-white">Your Experiments</h3>
<h6 class="text-white">{{ status }}</h6>
</div>
<pool-description
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
  ></pool-description>
   
</template>

<script src="./displayPools.js"></script>
