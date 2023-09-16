import type { AstroAdapter, AstroIntegration } from "astro";
import type { Options } from "./types";

export function getAdapter(args?: Options): AstroAdapter {
  return {
    name: "astro-bun",
    serverEntrypoint: "astro-bun/server.js",
    args: args ?? {},
    exports: ["stop", "handle", "start", "running"],
    supportedAstroFeatures: {
      hybridOutput: "experimental",
      staticOutput: "experimental",
      serverOutput: "experimental",
      assets: {
        supportKind: "experimental",
        isSharpCompatible: true,
        isSquooshCompatible: true,
      },
    },
  };
}

export default function createIntegration(args?: Options): AstroIntegration {
  return {
    name: "astro-bun",
    hooks: {
      "astro:config:done": ({ setAdapter, config }) => {
        setAdapter(getAdapter(args));

        if (config.output === "static") {
          console.warn(
            `[astro-bun] \`output: "server"\` or \`output: "hybrid"\` is required to use this adapter.`,
          );
          console.warn(
            `[astro-bun] Otherwise, this adapter is not required to deploy a static site to Bun.`,
          );
        }
      },
    },
  };
}
