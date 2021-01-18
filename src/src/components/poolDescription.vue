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
		      <div class="dropup"> 
				<button type="button" class="btn btn-primary dropdown-toggle" id="requestmenu" data-toggle="dropdown">
				  Request <span class="caret"></span>
				</button>
				<ul class="dropdown-menu" role="menu" aria-labelledby="menu1">
				  <li @click="request(90)" role="presentation"><a role="menuitem" href="#" id="btn1">90 min</a></li>
				  <li @click="request(60)" role="presentation"><a role="menuitem" href="#" id="btn2">60 min</a></li>
				  <li @click="request(30)" role="presentation"><a role="menuitem" href="#" id="btn3">30 min</a></li>
				  <li @click="request(5)" role="presentation"><a role="menuitem" href="#" id="btn4">5 min</a></li>
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
