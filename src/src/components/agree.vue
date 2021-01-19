<template>
  <div>
      <button @click="show">Show modal</button>
        <div v-if="visible">
            Do you agree?
            <button @click="tell('agree')">I Agree</button>
            <button @click="tell('decline')">I Decline</button>
        </div>
        <span>Result: {{ result }}</span>
    </div>
</template>


<!---script>
export default {
  name: "Test",
 };
 
</script---->


<script lang="ts">
import { defineComponent, ref } from "vue";
import { usePromisedModal } from "../composables/usePromisedModal";

export default defineComponent({
    name: "Test",
    setup() {
        const { visible, ask, tell } = usePromisedModal<string>();
        let result = ref("");

        const show = async () => {
            result.value = await ask();
            // do something else… this code runs after the user's has made their choice.
        };

        return {
            show,
            visible,
            tell,
            result
        };
    }
});
</script>
