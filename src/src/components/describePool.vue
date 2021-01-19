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
				  <li @click="request(90)"  role="presentation"><a role="menuitem" href="#" id="btn1">90 min</a></li>
				  <li @click="request(60)"  role="presentation"><a role="menuitem" href="#" id="btn2">60 min</a></li>
				  <li @click="request(30)"  role="presentation"><a role="menuitem" href="#" id="btn3">30 min</a></li>
				  <li @click="request(0.1)"   role="presentation"><a role="menuitem" href="#" id="btn4">6 sec</a></li>
				</ul>
			  </div>
		    </div>
	      </div>
    </div>		  
      </div>
  </div>	  
  </div>

<!-- Modal -->
<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
        ...
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div>


  
</div>


</template>

<script src="./describePool.js"></script>
