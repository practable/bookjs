<template>
<div>
    <Multiselect
      v-model="value"
      :options="options"
	  v-bind:key="item.id"
      />
</div>
<div>
   <button @click="book">request</button>
</div>
</template>

<script src="./bookActivity.js"></script>

<style src="@vueform/multiselect/themes/default.css"></style>
