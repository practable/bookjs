<template>
  <template v-if="current.value === 'userLocal'">
    <div>Checking for pre-existing userName ...</div>
  </template>
  <template v-if="current.value === 'userRemote'">
    <div>Getting a new userName ...</div>
  </template>
  <template v-if="current.value === 'Login'">
    <div> Getting a login token for  {{ context.userName }} ...</div>
  </template>
  <template v-if="current.value === 'addDefaultGroup'">
    <div> Ensuring access to default group {{ context.defaultGroup }} ...</div>
  </template>
   <template v-if="current.value === 'loginDone'">
    <div> You have access to the following groups {{ context.groups }}.</div>
  </template> 

</template>
<script src="./Login.js"></script>
