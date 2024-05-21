import vue from '@vitejs/plugin-vue2';
import { defineConfig } from 'vite';
import { VuetifyResolver } from "unplugin-vue-components/resolvers";
import Components from 'unplugin-vue-components/vite';

// https://zenn.dev/longrun_jp/articles/7974bd1101fe9d
export default defineConfig({
  plugins: [
    vue(),
    Components({
      resolvers: [ VuetifyResolver() ]
    }),
  ],
  define: { 'process.env': {} },
  resolve: {
    alias: [
      { find: '@', replacement: '/src' },
    ],
  },
})