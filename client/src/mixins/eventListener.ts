import { type Ref } from "vue";

export default {
    click(items: Array<{ id: string; ref: Ref<boolean> | any }>) {
        document.addEventListener("click", (event) => {
            const target = event.target as HTMLElement;

            items.forEach(({ id, ref }) => {
                const targetElement = document.getElementById(id);
                const targetElementButton = document.getElementById(id + "Button");

                if (
                    ref.value &&
                    !targetElement?.contains(target) &&
                    !targetElementButton?.contains(target)
                ) {
                    ref.value = false;
                }
            });
        });
    },
    mousemove(items: Array<{ id: string; ref: Ref<boolean> }>) {
        document.addEventListener("mousemove", (event) => {
            const target = event.target as HTMLElement;

            items.forEach(({ id, ref }) => {
                const targetElement = document.getElementById(id);
                const targetElementButton = document.getElementById(id + "Button");
                const targetElementPopup = document.getElementById(id + "Popup");

                if (
                    targetElement?.contains(target) ||
                    targetElementButton?.contains(target) ||
                    targetElementPopup?.contains(target)
                ) {
                    ref.value = true;
                } else {
                    ref.value = false;
                }
            });
        });
    },
};
