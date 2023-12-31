# astro-bun

This adapter allows Astro to run your SSR site with the Bun's native API `Bun.serve`.

## Prerequisites

- Bun

## Installation

1. Install `astro-bun` package

```bash
bun add astro-bun
```

2. Update your `astro.config.mjs` to use `astro-bun` adapter.

```bash
// astro.config.mjs
import { defineConfig } from 'astro/config';
import bun from 'astro-bun';

export default defineConfig({
  output: 'server',
  adapter: bun(),
});
```

3. Build your project.

```bash
bunx --bun astro build
```

This will generate an `entry.mjs` script inside `./dist/server`.

4. Run the `entry.mjs` script.

```bash
bun run ./dist/server/entry.mjs
```

or, you can update the `preview` script in you `package.json`.

```json
// package.json
{
  // ...
  "scripts": {
    "dev": "astro dev",
    "start": "astro dev",
    "build": "astro build",
    "preview": "bun run ./dist/server/entry.mjs"
  }
}
```

and then just run:

```bash
bunx --bun astro preview
```
