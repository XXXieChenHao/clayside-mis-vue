/*
 * @Author: xie chenhao
 * @Date: 2022-02-13 23:24:12
 * @LastEditTime: 2022-02-17 21:41:22
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\vite.config.js
 * 生命不息，代码不止
 */
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import { resolve } from 'path';

export default defineConfig ({
  plugins: [vue()],
  server: {
    host: '0.0.0.0',
    open: '/',
    proxy: {
      '/api': {
        // 使用 api 时代理
        target: 'https://dev.clayside.doransoul.com/',
        changeOrigin: true,
        rewrite: path => path.replace(/^\/api/, '')
      }
    }
  },
  alias: [
    { find: '@', replacement: resolve(__dirname, 'src') },
    { find: 'com', replacement: resolve(__dirname, 'src/components') },
    { find: 'lib', replacement: resolve(__dirname, 'src/libs') },
    { find: 'api', replacement: resolve(__dirname, 'src/service') },
    { find: 'type', replacement: resolve(__dirname, 'src/interfaces') },
  ],
})
