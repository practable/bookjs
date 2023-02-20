<template>
  <template v-if="state.value === 'idle'">
    <button @click="send({ type: 'FETCH', query: 'users/unique', method: 'POST' })">
      Get a unique user name
    </button>
  </template>

  <template v-else-if="state.value === 'loading'">
    <div>Fetching...</div>
  </template>

  <template v-else-if="state.value === 'success'">
    <div>Success! {{ state.context.results }}</div>
  </template>

  <template v-else-if="state.value === 'failure'">
    <p>{{ state.context.error.message }}</p>
    <button @click="send({ type: 'RETRY', query: 'users/unique', method: 'POST' })">Retry</button>
  </template>
</template>
<script src="./FetchMachine.js"></script>
