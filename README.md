Since vite is now runnable in Deno (with the new node_modules magic), you can also develop a Qwik App in Deno (I tried it in v1.27.0):
1. Run deno run --allow-env --allow-read --allow-write --unstable npm:create-vite-extra
2. Choose a project name and select deno-vue
3. Replace vite.config.mjs with:

```
import { defineConfig } from 'npm:vite'
import { qwikVite } from 'npm:@builder.io/qwik/optimizer';
import { qwikCity } from 'npm:@builder.io/qwik-city/vite';
import tsconfigPaths from 'npm:vite-tsconfig-paths';
import 'npm:typescript'

export default defineConfig(() => {
  return {
    plugins: [qwikCity(), qwikVite(), tsconfigPaths()],
    preview: {
      headers: {
        'Cache-Control': 'public, max-age=600',
      },
    },
  };
});
```
4. Replace folders src and public with that of a newly created qwik project
5. Run deno task dev and open it in your browser 🎉 

Problems:
1. Building a production build using deno task build fails, as deno has not yet created bindings for all node APIs:
```
[vite-plugin-qwik] Not implemented
error during build:
Error: Not implemented
    at transformFsAsync (file:///home/runner/work/deno-qwik/deno-qwik/node_modules/.deno/@builder.io+qwik@0.12.1/node_modules/@builder.io/qwik/optimizer.mjs:670:9)
Error: Process completed with exit code 1.
```
2. IDE support is not good. I get a lot of Cannot find name 'React'.ts(2304) errors everywhere in JSX, which should be solvable looking at the Deno Vite React Starter
---
# Vite + Deno + Vue

## Running

You need to have Deno v1.25.4 or later intalled to run this repo.

Start a dev server:

```
$ deno task dev
```

## Deploy

Build production assets:

```
$ deno task build
```

## Notes

- You need to use `.mjs` or `.mts` extension for the `vite.config.[ext]` file.

## Papercuts

Currently there's a "papercut" for Deno users:

- peer dependencies need to be referenced in `vite.config.js` - in this example
  it is only `vue` package that needs to be referenced
