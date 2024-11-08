import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  // https://vitejs.dev/guide/static-deploy#github-pages
  base: '/byteark-player-vue/',
  plugins: [vue()],
  build: {
    outDir: './dist/example',
  }
})
