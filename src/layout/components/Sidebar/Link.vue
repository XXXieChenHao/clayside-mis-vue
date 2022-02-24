<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 22:13:30
 * @LastEditTime: 2022-02-17 19:44:51
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\layout\components\Sidebar\Link.vue
 * 生命不息，代码不止
-->

<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue';
const props = defineProps({
  to: {
    type: String,
    required: true
  }
})

let isExternal: any = computed(() => {
  return isExternal(props.to)
})
const type = computed(() => {
  if (isExternal) {
    return 'a'
  }
  return 'router-link'
})

const linkProps = (to: any) => {
  if (isExternal) {
    return {
      href: to,
      target: '_blank',
      rel: 'noopener'
    }
  }
  return {
    to: to
  }
}
</script>
