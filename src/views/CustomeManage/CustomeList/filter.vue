<template>
  <div class="filter">
    <div>
      客户类型：
      <el-select class="search_ipt" size="small" v-model="params.value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
    </div>
    <div>
      客户名称：<el-input size="small" class="search_ipt" inline v-model="params.name"></el-input>
    </div>
      <div class="search_suffix">
       <el-button
        type="primary"
        plain
        size="small"
        icon="el-icon-search"
        @click="handleSearch"
      >
        搜索
      </el-button>
    </div>
  </div>
</template>

<script>
import { customerType } from '@/const/type'
export default {
  data() {
    return {
      params: {
        name: '',
        value: '',
      },
      options: []
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      this.options = customerType
    }
  }
}
</script>

<style>

</style>