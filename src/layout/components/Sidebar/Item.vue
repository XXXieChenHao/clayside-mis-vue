<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 22:19:39
 * @LastEditTime: 2022-02-13 22:55:50
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\layout\components\Sidebar\Item.vue
 * 生命不息，代码不止
-->
<template>
  <div>
     <i :class="[icon, 'iconfont']" />
     <span slot='title'>{{title}}</span>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from "vue";
const props = defineProps({
  icon: {
    type: String,
    default: ''
  },
  title: {
    type: String,
    default: ''
  }
})
</script>

<style scoped>
.iconfont {
  color: currentColor;
  font-size: 20px;
  margin-right: 6px;
}
</style>
