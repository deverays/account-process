/**Vue */
import { defineComponent, h } from "vue";

/**Lib */
import { cn } from "../../lib/utilts";

const ArrowIcon = defineComponent({
  props: {
    isActive: {
      type: Boolean,
      defautl: false,
    },
    className: {
      type: String,
      default: "transition-all",
    },
  },
  render() {
    const { isActive, className } = this;
    return h(
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class={cn(className, isActive ? "-scale-100" : "scale-100")}
      >
        <path
          d="M7 14.5l5-5 5 5"
          stroke="currentColor"
          stroke-width="1.5"
        ></path>
      </svg>
    );
  },
});

const AddIcon = defineComponent({
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  render() {
    return h(
      <svg
        class={this.className}
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M3.353 8.95A7.511 7.511 0 018.95 3.353c2.006-.47 4.094-.47 6.1 0a7.511 7.511 0 015.597 5.597c.47 2.006.47 4.094 0 6.1a7.511 7.511 0 01-5.597 5.597c-2.006.47-4.094.47-6.1 0a7.511 7.511 0 01-5.597-5.597 13.354 13.354 0 010-6.1z"
          fill="transparent"
          data-fill="secondary"
          stroke="currentColor"
          data-stroke="main"
          stroke-width="1.5"
        ></path>
        <path
          d="M14.5 12h-5m2.5 2.5v-5"
          stroke="currentColor"
          data-stroke="main"
          stroke-width="1.5"
          stroke-linecap="round"
        ></path>
      </svg>
    );
  },
});

const CategoryIcon = defineComponent({
  render() {
    return h(
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-[24px] h-[24px]"
      >
        <path
          d="M3.297 5.234a2.599 2.599 0 011.937-1.937 5.544 5.544 0 012.532 0 2.599 2.599 0 011.937 1.937c.195.833.195 1.7 0 2.532a2.599 2.599 0 01-1.937 1.937c-.833.195-1.7.195-2.532 0a2.599 2.599 0 01-1.937-1.937 5.545 5.545 0 010-2.532zM3.297 16.234a2.599 2.599 0 011.937-1.937 5.546 5.546 0 012.532 0 2.599 2.599 0 011.937 1.937c.195.833.195 1.7 0 2.532a2.599 2.599 0 01-1.937 1.937c-.833.195-1.7.195-2.532 0a2.599 2.599 0 01-1.937-1.937 5.545 5.545 0 010-2.532zM14.297 5.234a2.599 2.599 0 011.937-1.937 5.544 5.544 0 012.532 0 2.599 2.599 0 011.937 1.937c.195.833.195 1.7 0 2.532a2.599 2.599 0 01-1.937 1.937c-.833.195-1.7.195-2.532 0a2.599 2.599 0 01-1.937-1.937 5.546 5.546 0 010-2.532zM14.297 16.234a2.599 2.599 0 011.937-1.937 5.546 5.546 0 012.532 0 2.599 2.599 0 011.937 1.937c.195.833.195 1.7 0 2.532a2.599 2.599 0 01-1.937 1.937c-.833.195-1.7.195-2.532 0a2.599 2.599 0 01-1.937-1.937 5.546 5.546 0 010-2.532z"
          fill="transparent"
          data-fill="secondary"
          stroke="currentColor"
          data-stroke="main"
          stroke-width="1.5"
        ></path>
      </svg>
    );
  },
});

const HelloIcon = defineComponent({
  render() {
    return h(
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class="w-[24px] h-[24px]"
      >
        <path
          d="M20.45 9.85a1.14 1.14 0 00-1.73.13L16 13.4l-.12-.27 2.54-5.9a1.64 1.64 0 00-.65-2.09 1.34 1.34 0 00-1.87.73l-2.15 5-.4-.2L15 4.17a1.62 1.62 0 00-1-1.95 1.41 1.41 0 00-1.74 1.1l-1.77 7.09-.37.11.59-6.08a1.43 1.43 0 00-1.15-1.61 1.35 1.35 0 00-1.45 1.29l-.85 8.76h-.15l-.26.1-1-3.23a1.32 1.32 0 00-1.64-1l-.17.06a1.56 1.56 0 00-.75 1.93l1.74 5.74a4 4 0 00.13.74 3.38 3.38 0 003 2.67 4.9 4.9 0 002 1.27c2.64.82 5.37-.9 6.11-3.85a.43.43 0 000-.11l4.23-5.42a1.5 1.5 0 00-.05-1.93z"
          fill="currentColor"
          data-fill="main"
          stroke="currentColor"
          data-stroke="main"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
          fill-opacity="0.16"
        ></path>
        <path
          d="M19.28 3a3.58 3.58 0 012.31 2.11M20.28 2a2.37 2.37 0 011.6 1.47M4.67 21.07a3.56 3.56 0 01-2.1-2.32M3.57 22a2.39 2.39 0 01-1.45-1.62"
          stroke="currentColor"
          data-stroke="main"
          stroke-miterlimit="10"
          stroke-linecap="round"
        ></path>
      </svg>
    );
  },
});

const InfoCircleIcon = defineComponent({
  props: {
    className: {
      type: String,
      default: "w-[24px] h-[24px]",
    },
  },
  render() {
    return h(
      <svg
        fill="currentColor"
        class={cn(this.className, "transition-all")}
        viewBox="0 0 24 24"
        id="Layer_1"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path d="M12,2A10,10,0,1,0,22,12,10.01114,10.01114,0,0,0,12,2Zm0,18a8,8,0,1,1,8-8A8.00917,8.00917,0,0,1,12,20Zm0-8.5a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0v-3A1,1,0,0,0,12,11.5Zm0-4a1.25,1.25,0,1,0,1.25,1.25A1.25,1.25,0,0,0,12,7.5Z" />
      </svg>
    );
  },
});

const PencilIcon = defineComponent({
  props: {
    className: {
      type: String,
      default: "w-[24px] h-[24px]",
    },
  },
  render() {
    return h(
      <svg
        class={cn(this.className, "transition-all")}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 2C2.34315 2 1 3.34315 1 5V9V10V19C1 20.6569 2.34315 22 4 22H7C7.55228 22 8 21.5523 8 21C8 20.4477 7.55228 20 7 20H4C3.44772 20 3 19.5523 3 19V10V9C3 8.44772 3.44772 8 4 8H11.7808H13.5H20.1C20.5971 8 21 8.40294 21 8.9V9C21 9.55228 21.4477 10 22 10C22.5523 10 23 9.55228 23 9V8.9C23 7.29837 21.7016 6 20.1 6H13.5H11.7808L11.3489 4.27239C11.015 2.93689 9.81505 2 8.43845 2H4ZM4 6C3.64936 6 3.31278 6.06015 3 6.17071V5C3 4.44772 3.44772 4 4 4H8.43845C8.89732 4 9.2973 4.3123 9.40859 4.75746L9.71922 6H4ZM22.1213 11.7071C20.9497 10.5355 19.0503 10.5355 17.8787 11.7071L16.1989 13.3869L11.2929 18.2929C11.1647 18.4211 11.0738 18.5816 11.0299 18.7575L10.0299 22.7575C9.94466 23.0982 10.0445 23.4587 10.2929 23.7071C10.5413 23.9555 10.9018 24.0553 11.2425 23.9701L15.2425 22.9701C15.4184 22.9262 15.5789 22.8353 15.7071 22.7071L20.5556 17.8586L22.2929 16.1213C23.4645 14.9497 23.4645 13.0503 22.2929 11.8787L22.1213 11.7071ZM19.2929 13.1213C19.6834 12.7308 20.3166 12.7308 20.7071 13.1213L20.8787 13.2929C21.2692 13.6834 21.2692 14.3166 20.8787 14.7071L19.8622 15.7236L18.3068 14.1074L19.2929 13.1213ZM16.8923 15.5219L18.4477 17.1381L14.4888 21.097L12.3744 21.6256L12.903 19.5112L16.8923 15.5219Z"
          fill="currentColor"
        />
      </svg>
    );
  },
});

export {
  ArrowIcon,
  AddIcon,
  CategoryIcon,
  HelloIcon,
  InfoCircleIcon,
  PencilIcon,
};
