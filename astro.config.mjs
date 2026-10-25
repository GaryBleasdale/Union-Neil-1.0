import { defineConfig } from "astro/config";
import alpinejs from "@astrojs/alpinejs";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  site: "https://unionneil.com.br",
  integrations: [
    alpinejs(),
    // /cadastro is a password-gated page for staff, not for search results.
    sitemap({ filter: (page) => !page.includes("/cadastro") }),
  ],
  vite: { plugins: [tailwindcss()] },
});
