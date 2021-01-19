import BaseModal from "../components/BaseModal.vue";
import { defineComponent, reactive } from "vue";
import { usePromisedModal } from "../composables/usePromisedModal";

export default defineComponent({
  name: "Vue3FormComponent",
  components: {
    BaseModal,
  },
  setup() {
    console.log("confirmationModal:setup");
    const { visible, ask, tell } = usePromisedModal<boolean>();

    const form = reactive({ title: "hello world" });

    const handleSubmit = async (): Promise<void> => {
      console.log("Awaiting modal thing....");
      console.log("vis?", visible);
      const confirmed = await ask();

      // do something… this code runs after the user's has made their choice.
      if (confirmed) {
        // axios.post(ENDPOINT, { ..form });
        console.log("CHOICE YES");
      } else {
        console.log("CHOICE NO"); // do something else
      }
    };

    return {
      form,
      handleSubmit,
      visible,
      tell,
    };
  },
});
