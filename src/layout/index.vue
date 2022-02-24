<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 21:02:35
 * @LastEditTime: 2022-02-13 21:38:56
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\layout\index.vue
 * 生命不息，代码不止
-->
<template>
  <el-container class="layout-container">
    <el-aside width="256px">
      <Sidebar></Sidebar>
    </el-aside>
    <el-container>
      <el-header>
        <Header></Header>
      </el-header>
      <el-main>
        <AppView></AppView>
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang='ts' setup>
import Sidebar from './components/Sidebar/index.vue'
import Header from './components/Header/index.vue'
import AppView from './components/AppView/index.vue'
</script>

<style lang='scss' scoped>
.layout-container {
  height: 100vh;
}
</style>
