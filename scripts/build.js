import * as esbuild from "esbuild";

await esbuild.build({
  entryPoints: ["./src/index.ts", "./src/server.ts", "./src/types.ts"],
  outdir: "dist",
  minify: false,
  format: "esm",
  platform: "node",
  target: "node18",
  sourcemap: false,
  sourcesContent: false,
});
