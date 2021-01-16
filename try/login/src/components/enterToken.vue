<template>
  <button @click="quickToken">get token</button>
  <input :value="token" @input="updateToken" >
  <button @click="bookingLogin">login</button>
  <button @click="deleteToken">clear</button>
</template>

<script src="./enterToken.js"></script>
