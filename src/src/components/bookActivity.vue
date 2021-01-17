<template>
<div>
  <li v-for="item in options">
 {{ item}}
  </li>
	
</div>
<div>
   <button @click="book">request</button>
</div>
</template>

<script src="./bookActivity.js"></script>
