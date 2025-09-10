import { defineConfig } from "vite"

export default defineConfig({
  root: ".", // directorio raíz
  build: {
    outDir: "dist",
    rollupOptions: {
      input: {
        main: "./index.html", // punto de entrada principal
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
})
