/**Vue */
import { defineComponent } from "vue";
9;
export default defineComponent({
  render() {
    return (
      <div class="transition-all duration-1000 bg-transparent h-screen w-full opacity-[0.01] hover:opacity-[0.03]">
        <ul class="absolute inset-0 overflow-hidden">
          <li
            class="absolute w-20 h-20 bg-gray-100 animate-animateCircle"
            style="bottom: -150px; left: 25%;"
          ></li>
          <li
            class="absolute w-5 h-5 bg-gray-100 animate-animateCircle duration-1200"
            style="bottom: -150px; left: 10%;"
          ></li>
          <li
            class="absolute w-5 h-5 bg-gray-100 animate-animateCircle"
            style="bottom: -150px; left: 70%; animation-delay: 4s;"
          ></li>
          <li
            class="absolute w-12 h-12 bg-gray-100 animate-animateCircle duration-1800"
            style="bottom: -150px; left: 40%;"
          ></li>
          <li
            class="absolute w-5 h-5 bg-gray-100 animate-animateCircle"
            style="bottom: -150px; left: 65%;"
          ></li>
          <li
            class="absolute w-28 h-28 bg-gray-100 animate-animateCircle"
            style="bottom: -150px; left: 75%; animation-delay: 3s;"
          ></li>
          <li
            class="absolute w-36 h-36 bg-gray-100 animate-animateCircle"
            style="bottom: -150px; left: 35%; animation-delay: 7s;"
          ></li>
          <li
            class="absolute w-6 h-6 bg-gray-100 animate-animateCircle duration-4500"
            style="bottom: -150px; left: 50%; animation-delay: 15s;"
          ></li>
          <li
            class="absolute w-4 h-4 bg-gray-100 animate-animateCircle duration-3500"
            style="bottom: -150px; left: 20%; animation-delay: 2s;"
          ></li>
          <li
            class="absolute w-36 h-36 bg-grey-200 animate-animateCircle duration-1100"
            style="bottom: -150px; left: 85%;"
          ></li>
        </ul>
      </div>
    );
  },
});
