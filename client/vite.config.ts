import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";
import components from "unplugin-vue-components/vite";
import autoImport from "unplugin-auto-import/vite";
import { VarletUIResolver } from "unplugin-vue-components/resolvers";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx(),
    components({
      resolvers: [VarletUIResolver()],
      directoryAsNamespace: true,
    }),
    autoImport({
      resolvers: [VarletUIResolver({ autoImport: true })],
    }),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  server: {
    proxy: {
      "/getSongList": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
      "/getSongInFo": {
        target: "http://localhost:3001",
        changeOrigin: true,
        rewrite: (path) => path,
      },
    },
  },
});
