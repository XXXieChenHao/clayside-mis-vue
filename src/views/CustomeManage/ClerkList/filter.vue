<template>
  <div>
    <div class="filter">
    <div>
      店员名称：<el-input size="small" class="search_ipt" placeholder="请输入店员名称" inline v-model.trim="serachParam.userName"></el-input>
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
     <div class="button_suffix">
      <el-button
        type="primary"
        size="small"
        @click="handleOpenDialog(dialogType.create)"
      >
        添加店员
      </el-button>
    </div>
  </div>
  </div>
</template>

<script>
import { dialogType, } from '@/const/type'

export default {
  data() {
    return {
      dialogType,
      serachParam: {
        userName: '',
        userType: '',
      },
 
    }
  },
  computed: {
  },
  created() {
  },
  methods: {
    handleSearch() {
      this.$emit('search', this.serachParam)
    },
    handleOpenDialog(type) {
      this.$emit('clickAdd', type)
    }
  }
}
</script>

<style lang="scss" scoped>
.button_suffix {
  display: inline-block;
  margin-left: 50px;
}
</style>