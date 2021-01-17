<template>
  <h3>Available Pools</h3>
   <button @click="getStatus">get</button> 
   <div>{{ status }}</div>
   <div>{{ ids }}</div>
<ul>
  <li v-for="item in details">
    Pool: {{ item}}
  </li>
</ul>

   
</template>

<script src="./displayPools.js"></script>
