<template>
  <div>
	<h3>Modal</h3>
  <div> hello </div>
  <Test />
	<p style="margin-bottom:3cm;"></p>
	<Vue3FormComponent />

</div>
</template>

<script>

import  Test from "../components/agree.vue"
import Vue3FormComponent from "../components/confirmationModal.vue"

export default {
  name: "Modal",
components: {Test,
Vue3FormComponent
},
 };
 
</script>
