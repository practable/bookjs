<template>

  <img width="300" src="http://localhost:8008/images/booking/practable-logo-1980x660.png">
  
  <div id="nav">
	<router-link to="/">Home</router-link> |
	<router-link to="/login">Login</router-link> |
	<router-link to="/modal">Modal</router-link> |	
	<router-link to="/about">About</router-link>
	
  </div>
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
