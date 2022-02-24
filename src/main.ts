/*
 * @Author: xie chenhao
 * @Date: 2022-02-12 11:57:20
 * @LastEditTime: 2022-02-24 21:36:22
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\main.ts
 * 生命不息，代码不止
 */
import { createApp } from 'vue'

import App from './App.vue'
import router from './router'
import store from './store/index'

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import '@/styles/index.scss'

import '@/permission' // permission control

const app = createApp(App)


app
  .use(ElementPlus)
  .use(store)
  .use(router)
  .mount('#app')
