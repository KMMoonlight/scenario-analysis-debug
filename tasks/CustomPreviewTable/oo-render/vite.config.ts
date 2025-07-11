import { join } from "node:path";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  server: {
    port: Number(process.env.OO_RENDER_PORT || 0) || undefined,
  },
  root: join(__dirname, "dev"),
  build: {
    emptyOutDir: true,
    outDir: join(__dirname, "dist"),
    lib: {
      entry: join(__dirname, "src", "render.tsx"),
      name: "Render",
      formats: ["es"],
      fileName: () => "render.mjs",
      cssFileName: "style",
    },
    rollupOptions: {},
  },
  define: {
    "process.env.NODE_ENV": JSON.stringify(mode),
  },
}));
