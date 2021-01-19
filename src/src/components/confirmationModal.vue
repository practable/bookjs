<template>
    <form @submit.prevent="handleSubmit">
        <!-- other stuff... -->
        <button type="submit">Submit</button>
        <base-modal
            :visible="confirmationModal.visible"
        >
            <template #default>
                Do you agree?
            </template>
            <template #actions>
                <button @click="confirmationModal.tell(true)">I Agree</button>
                <button @click="confirmationModal.tell(false)">I Decline</button>
            </template>
        </base-modal>
    </form>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import { usePromisedModal } from "../composables/usePromisedModal";

export default defineComponent({
    name: "Vue3FormComponent",
setup() {
console.log("confirmationModal:setup")
        const confirmationModal = usePromisedModal<boolean>();

        const form = reactive({ title: "hello world" });

        const handleSubmit = async (): Promise<void> => {
            const confirmed = await confirmationModal.ask();

            // do something… this code runs after the user's has made their choice.
            if (confirmed) {
                // axios.post(ENDPOINT, { ..form });
console.log("CHOICE YES")
            } else {
               console.log("CHOICE NO") // do something else
            }
        };

        return {
            form,
            handleSubmit,
            confirmationModal,
        };
    }
});
</script>
