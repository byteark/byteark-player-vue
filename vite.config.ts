import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import { resolve } from 'path'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      include: ['src'],
      rollupTypes: true,
      copyDtsFiles: true,
      insertTypesEntry: true,
    })
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ByteArkPlayerVue',
      fileName: 'byteark-player-vue',
      formats: ['umd', 'es'],
    },
    outDir: './dist/@byteark',
    emptyOutDir: true,
    copyPublicDir: false,
    rollupOptions: {
      external: ['vue'],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue'
        },
        assetFileNames: (chunkInfo) => {
          if (chunkInfo.name === 'style.css') {
            return 'byteark-player-vue.css'
          }
          return '[name].[hash][extname]'
        }
      }
    }
  }
})
