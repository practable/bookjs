<template>
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="image" class="card-img" :alt="title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> {{ title }}</h5>
        <p class="card-text text-secondary"> {{ what }}</p>
		
		<div v-if="!bookingAttempted" class="container">
          <div class="row">
            <div class="col">
	          <p class="card-text"><small class="text-muted"> {{ status }} </small></p>
			</div>
		  <div class="col"> 
		      <div class="dropup"> 
				<button type="button" class="btn btn-primary dropdown-toggle" id="requestmenu" data-toggle="dropdown" :disabled="!enabled">
				  Request <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
				  <li @click="request(60)"  role="presentation"><a role="menuitem" href="#" id="btn2">Now for 60 min</a></li>
				  <li @click="request(30)"  role="presentation"><a role="menuitem" href="#" id="btn3">Now for 30 min</a></li>
				  <li @click="request(10)"  role="presentation"><a role="menuitem" href="#" id="btn3">Now for 10 min</a></li>				  
				  <li @click="request(5)"  role="presentation"><a role="menuitem" href="#" id="btn3">Now for 5 min</a></li>
				</ul>
			  </div>
		    </div>
	      </div>
        </div>
		<div v-if="bookingAttempted" class="container">
          <div v-if="bookingOK" class="row bg-success"> 
			<div class="col text-white text-center align-middle"> {{ result }}	</div>
			  <span @click="closeResult()"  class="close-button topright">&times;</span>
			 </div>
		  <div v-if="!bookingOK" class="row bg-danger">
			<div class="col text-white text-center align-middle">{{ result }}</div>
			  <span @click="closeResult()"  class="close-button topright">&times;</span>
			</div>
	    </div>
	</div>
  </div>	  
  </div>

</div>

</template>

<script src="./describePool.js"></script>

<style>
.close-button {
  border: none;
  display: inline-block;
  padding: 8px 16px;
  vertical-align: middle;
  overflow: hidden;
  text-decoration: none;
  color: white;
  background-color: inherit;
  text-align: center;
  cursor: pointer;
  white-space: nowrap
}

.topright {
  position: relative;
  right: 0;
  top: 0;
}
</style>
