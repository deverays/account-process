import { defineComponent, h } from "vue";
import { PencilIcon } from "./icon";
import { cn } from "../../lib/utilts";

const UserAvatar = defineComponent({
  props: {
    isEdit: { type: Boolean, default: false },
    avatar_url: String,
  },
  emits: ["change"],
  render() {
    return h(
      <div
        onClick={() => {
          if (!this.$props.isEdit) {
            (window.location.href as any) = this.$props.avatar_url;
          }
        }}
        class={cn(
          "relative flex items-center justify-center w-20 h-20 group rounded-full bg-light-200 dark:bg-dark-100 cursor-pointer"
        )}
      >
        {this.$props.isEdit && (
          <>
            <div class="transition-all absolute flex items-center justify-center rounded-full bg-dark-300 opacity-0 group-hover:opacity-100 w-20 h-20 bg-opacity-40 text-gray-100">
              <PencilIcon />
            </div>
            <input
              type="file"
              onChange={(event) => this.$emit("change", event)}
              class="absolute w-20 h-20 opacity-0 cursor-pointer"
            />
          </>
        )}
        <img
          v-lazy={this.$props.avatar_url}
          class="border-2 border-solid border-black dark:border-gray-100 w-20 h-20 rounded-full"
        />
      </div>
    );
  },
});

export { UserAvatar };
