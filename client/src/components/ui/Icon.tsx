import classNames from "classnames";
import { defineComponent } from "vue";

const ArrowIcon = defineComponent({
  name: "ArrowIcon",
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
    return (
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        class={`${className} ${isActive ? "-scale-100" : "scale-100"}`}
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
  name: "AddIcon",
  props: {
    className: {
      type: String,
      default: "",
    },
  },
  render() {
    return (
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
  name: "CategoryIcon",
  render() {
    return (
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
  name: "HelloIcon",
  render() {
    return (
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
  name: "InfoCircle",
  props: {
    className: {
      type: String,
      default: "w-[24px] h-[24px]",
    },
  },
  render() {
    return (
      <svg
        fill="currentColor"
        class={classNames(this.className, "transition-all")}
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

export { ArrowIcon, AddIcon, CategoryIcon, HelloIcon, InfoCircleIcon };
