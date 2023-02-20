<template>
<template v-if="false">
   <div>  Will be a Card for {{ description }} </div>
</template>
<template v-else>
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
				<button type="button" @click='cancelBooking()' class="btn btn-danger" id="book" :disabled="isSession">
				  Cancel <span class="caret"></span>
				</button>
		</div>
		</div>
		<div class="col">
		  <div class="dropup"> 
				<button type="button" @click='getActivity()' class="btn btn-success" id="open" :disabled="bookingNotStarted">
				  Open <span class="caret"></span>
				</button>
		  </div>
		 
		  
		  </div>

		</div>
		</div>
		
	</div>
  </div>
  <div v-if="isSession"> <p class="card-text text-secondary">Only an admin can cancel this booking for {{ session }}</p></div>
  </div>


</template>
</template>
<script src="./DisplayBooking.js"></script>


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
