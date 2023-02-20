<template>
  <div class="card mb-3" style="max-width: 240px;">

	  {{ start.format("ddd D MMM HH:mm") }} -  {{ end.format("HH:mm") }} 	

	<div class="dropup"> 
				<button type="button" @click='makeBooking(id, time)' class="btn btn-primary" id="book">
				  Book
				</button>

        </div>
	</div>

</template>
<script src="./DisplayTime.js"></script>


<!-- 



  <div class="row">
<div class="col" />
	<div class="col">
	  {{ start.format("ddd D MMM HH:mm") }} -  {{ end.format("HH:mm") }} 	
	</div>
	<div class="col">
		<div class="dropup"> 
				<button type="button" @click='makeBooking(id, time)' class="btn btn-primary" id="book">
				  Book
				</button>

        </div>
 
	</div>
	<div class="col" />
	 <hr />
  </div>

-->
