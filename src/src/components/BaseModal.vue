<template>
    <div v-if="visible">
        <slot>
            Are you sure that you want to do something potentially dangerous?
        </slot>
        <slot #actions>
            <button
                @click.prevent="$emit('confirmation', true)"
            >Proceed</button>
        </slot>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    name: "BaseModal",
    props: ['visible'],
});
</script>
