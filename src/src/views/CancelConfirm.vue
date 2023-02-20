<script setup>
  import CancelConfirm from '../components/CancelConfirm.vue'
  import { useBookingService } from "../components/bookingMachine.js";
  
 const { state, send } = useBookingService();
 
  
</script>

<template>
<CancelConfirm :booking="state.context.bookingToCancel"/>
</template>
