<template>
  <div class="container-fluid">
	<div class="row">
      <div class="col bg-secondary">
	    <h3 class="text-white text-left" > This equipment booking is for:</h3>
      </div>
	  {{ description }}
    </div>
	<div class="row">
	  <describe-activity :id="id" :description="description" v-if="dataloaded" />
	</div>
	<p style="margin-bottom:0.5cm;"></p>
	<div class="row">
      <div class="col bg-primary">
        <h3 class="text-white text-left" > Choose your activity: </h3>
      </div>
	</div>
  </div>
</template>

<script src="./launchActivity.js"></script>
