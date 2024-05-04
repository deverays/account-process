import classNames from "classnames";
import imports from "./utils/imports";
import { defineComponent } from "vue";
import { RouterView } from "vue-router";
import { Progress } from "./components/shared/Loader";

const App = defineComponent({
  name: "App",
  setup() {
    const { store } = imports();

    store._isProgress = 30;
    store.initUser().then(() => (store._isProgress = 100));

    return { store };
  },
  render() {
    return (
      <>
        {/**Progress Bar */}
        <Progress value={this.store._isProgress} />
        {/**Page */}
        <div
          class={classNames(
            this.store._isProgress >= 100
              ? "z-0 pointer-events-none"
              : "z-[997] pointer-events-auto opacity-60"
          )}
        >
          <RouterView />
        </div>
      </>
    );
  },
});

export default App;
