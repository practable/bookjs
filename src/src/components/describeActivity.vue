<template>
  <div class="card mb-3" style="max-width: 540px;" v-if="dataloaded" :key="id">
    <div class="row no-gutters">
      <div class="col-md-4">
        <img :src="image" class="card-img" :alt="title">
      </div>
      <div class="col-md-8">
        <div class="card-body">
    	  <h5 class="card-title"> {{ title }}</h5>
          <p class="card-text"> {{ what }}</p>
		  <p class="card-text"> {{ about }}</p>
    		<div class="container">
              <div class="row">
    			<div class="col"> 
    			  <p class="card-text"><small class="text-muted"> {{ status }} </small></p>
    		    </div>
    		  </div>
          </div>		  
        </div>
      </div>	  
    </div>
  </div>
</template>

<script src="./describeActivity.js"></script>
