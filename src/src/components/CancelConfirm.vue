<template>
  
  <div class="container-fluid">
  <div class="bg-secondary row mb-2">
	<div class="col" />
	<div class="col">
      <h3 class="text-white text-left">Cancel Booking</h3>
    </div>
	
	<div class="col" />

	
	
  </div>
  <div class="row">
	<div class="col" />
	<div class="col"> 
	  Do you really want to cancel your booking? This cannot be undone. If you want to keep your booking, press the green Keep button, or return to the home page.
	  </div>
			<div class="col" />
  </div >
  
  <div class="row">
	<div class="col" />	
<div class="card mb-3" style="max-width: 540px;">
  <div class="row no-gutters">
    <div class="col-md-4">
      <img :src="image" class="card-img" :alt="title">
    </div>
    <div class="col-md-8">
      <div class="card-body">
        <h5 class="card-title"> {{ title }}</h5>
        <p class="card-text text-secondary"> {{ what }}</p>
		<p class="card-text text-secondary">  {{ start.format("ddd D MMM HH:mm") }} -  {{ end.format("HH:mm") }} </p>
		<!--p class="card-text text-secondary">  {{ start }} -  {{ end }} </p-->
		<div class="row">
		  		<div class="col">
		<div class="dropup"> 
				<button type="button" @click='cancel()' class="btn btn-danger" id="book">
				  Cancel <span class="caret"></span>
				</button>
		</div>
		</div>
		<div class="col">
		  <div class="dropup"> 
				<button type="button" @click='keep()' class="btn btn-success" id="open">
				  Keep <span class="caret"></span>
				</button>
		  </div>
		 
		  
		  </div>

		</div>
		</div>
		
	</div>
  </div>	  
  </div>
      	<div class="col" /> 

 </div>
</div>

</template>
<script src="./CancelConfirm.js"></script>

<!--

    <div class="row">
    <div class="col"/>
	<div class="col">
	  Deleting this booking cannot be undone. 
	</div>
	<div class="col">
		<div class="dropup"> 
				<button type="button" @click='delete()' class="btn btn-warning" id="delete">
				        Delete
				</button>

        </div>
		<div class="dropup"> 
				<button type="button" @click='keep()' class="btn btn-warning" id="keep">
				        Keep
				</button>

        </div>		
 	</div>
	
	<div class="col" />
	
-->
  
