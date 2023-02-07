<template>
  <div class="container-fluid">
  <p style="margin-bottom:1cm;"></p>
  <TheUserNameEditor />
  <p style="margin-bottom:1cm;"></p>
  <FetchDemo />
  <p style="margin-bottom:1cm;"></p>  
  </div>
</template>

<script>
  import TheUserNameEditor from "../components/TheUserNameEditor.vue";
import FetchDemo from "../components/FetchDemo.vue";
export default {
  name: "User",
  components: {
      TheUserNameEditor,
	  FetchDemo,
  },
};
</script>
