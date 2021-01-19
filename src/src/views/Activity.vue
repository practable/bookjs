<template>
   <div class="container-fluid">
  <div class="row">
<launch-activity
  v-for="(item, index) in details"
  :description="item"
  :index="index"
  :key="item.id"
  ></launch-activity>
  </div>
  </div>
</template>

<script src='./Activity.js'></script>
