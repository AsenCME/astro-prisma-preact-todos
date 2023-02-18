import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import preact from "@astrojs/preact";
import netlify from "@astrojs/netlify/functions";

export default defineConfig({
  // TODO
  site: "http://localhost:3000",
  output: "server",
  integrations: [tailwind(), preact()],
  adapter: netlify(),
});
