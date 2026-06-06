import { defineConfig } from "@lovable.dev/vite-tanstack-config";

export default defineConfig({
  tanstackStart: {
    server: { entry: "server" },
  },
  nitro: {
    preset: "netlify",
    output: {
      dir: ".output",
      serverDir: ".output/server",
      publicDir: ".output/public",
    },
  },
});