import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://unionneil.com.br",
  integrations: [alpinejs()],
  vite: { plugins: [tailwindcss()] },
});
