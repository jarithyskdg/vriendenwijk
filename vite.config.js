import { defineConfig } from "vite";
import path from "path";
import viteImagemin from "vite-plugin-imagemin";

export default defineConfig({
  root: ".", // root stays the same (index.html lives here)
  base: "./", // ensures relative paths in production
  build: {
    outDir: "./dist",
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "./index.html"),
        detail: path.resolve(__dirname, "./detail.html"),
        overview: path.resolve(__dirname, "./overview.html"),
      },
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"), // use @/js/... or @/theme/...
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        
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
    open: "/index.html", // default page to open
    host: true,
    watch: {
      usePolling: true,
    },
  },
});
