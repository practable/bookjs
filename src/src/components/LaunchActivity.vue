<template>
  <div class="container-fluid">
    <div class="row">
      <div class="col bg-secondary">
        <h3 class="text-white text-left" > Your hardware </h3>
      </div>
    </div>
    <div class="row">
      <describe-activity :activity="activity" v-if="dataloaded" />
    </div>
    <div class="row">
      <div class="col bg-primary">
        <h3 class="text-white text-left" > Choose your interface</h3>
        <h6 class="text-white text-left" > You can come back here to change interfaces as often as you like</h6>        
      </div>
    </div>
    <div class="row" v-if="dataloaded">
      <describe-interface
        v-for="(item, index) in userinterfaces"
        :ui="item"
        :config="config"
        :streams="streams"
        :exp="exp"
        :index="index"
        :key="item.id"
        ></describe-interface>
    </div>

      </div>
</template>

<script src="./LaunchActivity.js"></script>
