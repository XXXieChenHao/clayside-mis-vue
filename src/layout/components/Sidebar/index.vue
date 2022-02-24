<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 21:21:57
 * @LastEditTime: 2022-02-13 23:17:14
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\layout\components\Sidebar\index.vue
 * 生命不息，代码不止
-->
<template>
  <div class="sidebar_warpper">
    <el-menu
      :router="true"
      :default-active="activeMenu"
      :background-color="Color.menuBg"
      text-color="#fff"
      :unique-opened="true"
      :active-text-color="Color.menuActiveText"
      :collapse-transition="false"
      mode="vertical"
    >
      <SidebarItem v-for="route in routes" :key="route.path" :item="route" :base-path="route.path" /> 
    </el-menu>
  </div>
</template>

<script lang='ts' setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'

import SidebarItem from './SidebarItem.vue'
import routes from '@/router/routes'

import Color from '@/configs/color' 

const $route = useRoute()

const activeMenu = computed(() => {
    const route = $route
    const { meta, path } = route
    if (meta.activeMenu) {
      return meta.activeMenu
    }
    return path
})
</script>

<style lang='scss' scoped>
.sidebar_warpper {
  height: 100%;
  .el-menu {
    height: 100%;
  }
}
</style>
