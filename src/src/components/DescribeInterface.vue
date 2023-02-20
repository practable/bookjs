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
		<div class="container">
          <div class="row">
            <div class="col">
			</div>
		  <div class="col"> 
		      <div class="dropup"> 
				<button type="button" @click="open"  class="btn btn-success" id="open">
				  Use now <span class="caret"></span>
				</button>
			  </div>
		    </div>
	      </div>
    </div>		  
      </div>
  </div>	  
  </div>
 </div>


</template>


<script src="./DescribeInterface.js"></script>
