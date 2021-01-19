<template>
  <div class="container-fluid">
	<div class="row">
      <div class="col bg-secondary">
	    <h3 class="text-white text-left" > This equipment booking is for:</h3>
      </div>
    </div>
	<div class="row">
	  <describe-activity :id="id" :description="description" v-if="dataloaded" />
	</div>
	<div class="row">
      <div class="col bg-primary">
        <h3 class="text-white text-left" > Choose your activity: </h3>
      </div>
	</div>
	<div class="row" v-if="dataloaded">
<describe-ui
  v-for="(item, index) in userinterfaces"
  :description="item"
  :index="index"
  :key="item.id"
  ></describe-ui>

	</div>
  </div>
</template>

<script src="./launchActivity.js"></script>
