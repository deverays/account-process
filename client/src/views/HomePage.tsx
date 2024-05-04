import { defineComponent } from "vue";
import AppLayout from "../layouts/AppLayout";

const HomePage = defineComponent({
  name: "HomePage",
  render() {
    return (
      <AppLayout>
        <h1 class="text-9xl font-rubik-semibold bg-gradient-to-r from-blue-200 to-blue-100 bg-clip-text text-transparent">
          Hello World
        </h1>
      </AppLayout>
    );
  },
});

export default HomePage;
