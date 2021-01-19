<template>
    <form @submit.prevent="handleSubmit">
        <!-- other stuff... -->
        <button type="submit">Submit</button>
        <base-modal
		  :visible="visible">
            <template v-slot:default>
                Do you agree?
            </template>
            <template v-slot:actions>
                <button @click="tell(true)">I Agree</button>
                <button @click="tell(false)">I Decline</button>
            </template>
        </base-modal>
    </form>
</template>

<script src="./confirmationModal.ts"></script>
