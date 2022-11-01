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

// import vue from 'npm:@vitejs/plugin-vue'
// import 'npm:vue'
// export default defineConfig({
//   plugins: [vue()]
// })
