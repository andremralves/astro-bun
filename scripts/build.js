const build = await Bun.build({
  entrypoints: ['./src/index.ts', './src/server.ts', './src/types.ts'],
  outdir: './dist',
});