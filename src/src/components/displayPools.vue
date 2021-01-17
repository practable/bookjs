<template>
  <h3>Available Pools</h3>
   <button @click="getStatus">get</button> 
   <div>{{ status }}</div>
<pool-description
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
  ></pool-description>
   
</template>

<script src="./displayPools.js"></script>
