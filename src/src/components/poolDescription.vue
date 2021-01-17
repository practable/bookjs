<template>
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="image" class="card-img" :alt="title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> {{ title }}</h5>
		 <!--h6 class="card-subtitle text-black"> {{ what }}</h6--->
        <p class="card-text text-secondary"> {{ about }}</p>
		<div class="container">
          <div class="row">
            <div class="col">
	          <p class="card-text"><small class="text-muted"> {{ status }} </small></p>
			</div>
		  <div class="col"> 
		      <div class="btn-group">
				<button @click="book" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown">
				  Request <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu">
				  <li><a href="#" id="btn1">5 min</a></li>
				  <li><a href="#" id="btn2">30 min</a></li>
				  <li><a href="#" id="btn3">60 min</a></li>
				  <li><a href="#" id="btn4">90 min</a></li>
				</ul>
			  </div>
		    </div>
	      </div>
    </div>		  
      </div>
  </div>	  
  </div>
</div>


</template>

<script src="./poolDescription.js"></script>
