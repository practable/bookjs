import { readonly, ref } from "vue";

/**
 * Vue 3 custom hook to promisify a user's choice inside of a modal
 * 
 * since the ask function returns a promise, it lets you
 * await the user's choice and continue execution.
 * 
 * @author Daniele Trapani
 */
export function usePromisedModal<T>() {
    /**
     * locally scoped variable to hold the promise's resolve function
     * it's generically typed to allow code reuse
     * it doesn't need to be reactive
     */
    let resolveFn: (value?: T) => void = () => {};

    /**
     * reactive variable that holds the visibility of the modal
     */
    const visible = ref(false);

    /**
     * make modal visible and store the resolve fn for later use
     */
    const ask = (): Promise<T> => {
        visible.value = true;
        return new Promise((resolve) => {
            resolveFn = resolve;
        });
    };

    /**
     * hide modal and call resolve function with user's choice
     * @param value user's choice
     */
    const tell = (value: T): void => {
        visible.value = false;
        resolveFn(value);
    };

    return {
        visible: readonly(visible),
        ask,
        tell,
    };
}