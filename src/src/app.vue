<template>

  <img width="300" src="http://localhost:8008/images/booking/practable-logo-1980x660.png">

  <div id="nav">
	<router-link to="/login">Catalogue</router-link> |
	<router-link to="/about">About</router-link>
	
  </div>

  <p style="margin-bottom:0.7cm;"></p>
	
  <router-view />

	
  </template>
<script>


export default {
  name: "App",
  components: { },
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
