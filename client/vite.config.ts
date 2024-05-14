import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import typescript2 from "rollup-plugin-typescript2";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    typescript2({
      check: false,
      include: ["./src/components/*.vue"],
      tsconfigOverride: {
        compilerOptions: {
          sourceMap: true,
          declaration: true,
          declarationMap: true,
        },
        exclude: ["vite.config.ts"],
        build: {
          cssCodeSplit: false,
          lib: {
            entry: "./src/",
            formats: ["es", "cjs"],
            name: "",
            fileName: (format: any) =>
              format == "es" ? "index.js" : "index.cjs",
          },
          rollupOptions: {
            external: ["vue"],
            output: {
              globals: {
                vue: "Vue",
              },
            },
          },
        },
      },
    }),
  ],
  server: {
    port: 3000,
  },
});
