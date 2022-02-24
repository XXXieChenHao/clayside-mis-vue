<template>
  <div class="show-user">
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="lable">用户名:</span>
        <span class="nav">{{ userInfo.sellerName }}</span>
      </el-col>
      <el-col :span="12">
        <span class="lable">昵称:</span>
        <span class="nav">{{ userInfo.nickName }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="lable">真实姓名:</span>
        <span class="nav">{{ userInfo.trueName }}</span>
      </el-col>
      <el-col :span="12">
        <span class="lable">身份证号:</span>
        <span class="nav">{{ userInfo.incorrectLoginNumber }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="lable">手机号:</span>
        <span class="nav">{{ userInfo.telephone }}</span>
      </el-col>
      <el-col :span="12">
        <span class="lable">电子邮箱:</span>
        <span class="nav">{{ userInfo.sellerMail }}</span>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <span class="lable">用户头像:</span>
        <el-image :src="userInfo.headImg"></el-image>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  props: {
    userInfo: {
      default: {},
      type: Object,
      require: true,
    },
  },
  filters: {
  },
};
</script>

<style lang="scss" scoped>
.show-user {
  .el-row {
    margin-bottom: 20px;
    .lable {
      display: inline-block;
      width: 120px;
      text-align: right;
      margin-right: 10px;
    }
    .nav {
      display: inline-block;
      width: 200px;
    }
    .el-image {
      width: 100px;
      height: 100px;
      vertical-align: middle;
      margin-right: 10px;
    }
  }
}
</style>