import { defineConfig } from "astro/config";
import bun from "astro-bun-adapter";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: bun({}),
});
