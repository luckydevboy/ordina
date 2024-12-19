import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import dts from "vite-plugin-dts";
import { peerDependencies } from "./package.json";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
      exclude: ["**/*.stories.ts", "**/*.test.ts"],
    }),
  ],
  build: {
    lib: {
      entry: "src/index.ts",
      name: "Vitro",
      fileName: (format) => `vitro.${format}.js`,
      formats: ["es", "umd", "cjs"],
    },
    rollupOptions: {
      external: Object.keys(peerDependencies),
      output: {
        globals: { react: "React", "react-dom": "ReactDOM" },
      },
    },
  },
});
