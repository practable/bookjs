<template> 
<div class="container-fluid">

  
	 <div class="row">
	   <div class="col"></div>
        <div class="card mb-3" style="max-width: 540px;">
          <div class="row no-gutters">
            <div class="col-md-4">
              <img :src="image" class="card-img" :alt="title">
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <h5 class="card-title"> {{ title }}</h5>
                <p class="card-text text-secondary"> {{ what }}</p>
        		<p class="card-text text-secondary"> {{ nextBookable }} </p>
               </div>	  
          </div>
        </div>
		</div>
		<div class="col"></div>

		  <div class="bg-secondary row mb-2">
	<div class="col">
      <h3 class="text-white text-left">Choose time</h3>
      <!--h6 class="text-white text-left"><button v-if="!disableRefresh" class="btn btn-light" @click="getStatus()" :disabled="disableRefresh">refresh</button> {{ status }}</h6--> 
    </div>

  </div>

	

		  <div class="row ">
			
<display-times 
  v-for="(times,key) in suggested"
  :key="key"
  :duration="key"
  :times="times"
  :slot="slot">
</display-times>

		  </div>

 
  <div class="row mb-2">
	<div class="col">
      <h4 class="bg-light" > Custom </h4>
	     </div>
	</div>	


		  
		
  <div class="row ">

	<div class="col"></div>
 	<div class="col">
       Start:  <input v-model="start" placeholder="YYYY-MM-DDTHH:MM:SSZ">
 
      End:  <input v-model="end" placeholder="YYYY-MM-DDTHH:MM:SSZ">

  		<div class="dropup"> 
				<button type="button" @click='makeBooking()' class="btn btn-primary" id="book">
				  Book
				</button>
	    </div>
	</div>
	
	<div class="col"></div>	
     	</div> 
 	
	 </div>
	 </div>
		
</template>

<script src="./ChooseTime.js"></script>


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
