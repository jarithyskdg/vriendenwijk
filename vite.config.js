import { defineConfig } from "vite";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  root: ".", // index.html lives here
  base: "./", // ensures relative paths in production
  build: {
    outDir: "./dist", // output outside /public
    emptyOutDir: true,
    rollupOptions: {
      input: path.resolve(__dirname, "./index.html"),
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // use @/js/... and @/scss/...
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        // optional: automatically include variables/mixins globally
        // additionalData: `@use "@/scss/_variables.scss" as *;`,
      },
    },
  },
  plugins: [
    viteImagemin({
      gifsicle: { optimizationLevel: 3 },
      optipng: { optimizationLevel: 7 },
      mozjpeg: { quality: 80 },
      svgo: {
        plugins: [
          { name: "removeViewBox", active: false },
          { name: "removeEmptyAttrs", active: false },
        ],
      },
    }),
  ],
  server: {
    open: true,
    host: true, // allow network testing
    watch: {
      usePolling: true, // more reliable file watching
    },
  },
});
