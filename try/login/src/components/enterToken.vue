<template>
<button @click="quickToken">get token</button>
<input :value="token" @input="updateToken" >
  <button @click="bookingLogin">login</button>
  <button @click="deleteToken">clear</button>
  <div v-if="valid">Our login token is valid until {{ when }}</div>
  <div v-if="!valid">Token invalid because {{ result }}</div>
  <div	v-if="valid">Token: {{ bearer }}</div>
</template>

<script src="./enterToken.js"></script>
