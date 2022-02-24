<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 21:42:03
 * @LastEditTime: 2022-02-13 23:13:50
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\layout\components\Sidebar\SidebarItem.vue
 * 生命不息，代码不止
-->
<template>
  <div v-if="!item.meta.hidden">
    <template v-if="hasOneShowingChild(item.children,item) && (!onlyOneChild.children||onlyOneChild.noShowingChildren)&&!item.alwaysShow">
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{'submenu-title-noDropdown':!isNest}">
          <item :icon="onlyOneChild.meta.icon||(item.meta&&item.meta.icon)" :title="onlyOneChild.meta.title" />
        </el-menu-item>
      </app-link>
    </template>
    <el-sub-menu v-else ref="subMenu" :index="resolvePath(item.path)" popper-append-to-body>
      <template #title>
        <item v-if="item.meta" :icon="item.meta && item.meta.icon" :title="item.meta.title" />
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-sub-menu>
  </div>
</template>

<script lang='ts' setup>
import { defineProps, ref } from 'vue'
import { isExternal } from '@/utils/validate'

import Link from './Link.vue'
import Item from './Item.vue'

let props = defineProps({
  item: {
    type: Object,
    required: true
  },
  isNest: {
    type: Boolean,
    default: false
  },
  basePath: {
    type: String,
    default: ''
  }
})

const onlyOneChild = ref()

const hasOneShowingChild: (children: any[], parent: object) => boolean = (children = [], parent) => {
  const showingChildren = children.filter(item => {
    if (item.hidden) {
      return false
    } else {
      onlyOneChild.value = item
      return true
    }
  })
  
  if (showingChildren.length === 1) {
    return true
  }

  if (showingChildren.length === 0) {
    onlyOneChild.value = { ... parent, path: '', noShowingChildren: true }
    return true
  }

  return false
}


const resolvePath = (routePath:string) => {
  if (isExternal(routePath)) {
    return routePath
  }
  if (isExternal(props.basePath)) {
    return props.basePath
  }
  return props.basePath + '/' + routePath
  // return path.resolve(props.basePath, routePath)
}


</script>

<style lang='' scoped>
 
</style>
