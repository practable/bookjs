<template>
  <div class="row">
<div class="col" />
	<div class="col">
	  	{{ message }}
	</div>
	<div class="col">
		<div class="dropup"> 
				<button type="button" @click='back()' class="btn btn-warning" id="back">
				  {{ next }} 
				</button>

        </div>
 
	</div>
	<div class="col" />
	 <hr />
  </div>
 
</template>
<script src="./DisplayBookingResponse.js"></script>
