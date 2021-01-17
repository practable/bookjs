<template>
  <h3>Available Pools</h3>
   <button @click="getStatus">get</button> 
   <div>{{ status }}</div>
   <div>{{ ids }}</div>
   <div>{{ details }}</div>
</template>

<script src="./displayPools.js"></script>
