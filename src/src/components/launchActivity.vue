<template>

  <div class="container-fluid">

	<div class="bg-secondary">
	  <h3 class="text-white text-left" > This equipment booking is for:</h3>
</div>

<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="image" class="card-img" :alt="title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
		<h5 class="card-title"> {{ title }}</h5>
		 <!--h6 class="card-subtitle text-black"> {{ what }}</h6--->
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
	<p style="margin-bottom:0.5cm;"></p>

<div class="bg-primary">
<h3 class="text-white text-left" > Choose your activity: </h3>
</div>


</div>

</template>

<script src="./launchActivity.js"></script>
