<template>
  <div class="upload-image">
    <el-upload
      class="img-uploader"
      action="https://jsonplaceholder.typicode.com/posts/"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      :style="styleObject"
    >
      <img
        v-if="imageUrl"
        :src="imageUrl"
        class="avatar"
      >
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      />
    </el-upload>
  </div>
</template>

<script>
export default {
  name: "UpLoadImage",
  props: {
    width: String,
    height: String
  },
  data() {
    return {
      styleObject: {
        width: "",
        height: ""
      },
      imageUrl: ""
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      // 初始化
      this.styleObject = {
        width: this.width > 700 ? "100%" : this.width + "px",
        height: this.height + "px"
      };
    },
    beforeAvatarUpload(file) {},
    handleAvatarSuccess(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
    }
  }
};
</script>

<style lang="scss" scoped>
.upload-image {
  width: 100%;

  .img-uploader {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 100%;
  }

  ::v-deep .el-upload {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .el-upload:hover {
    border-color: #409eff;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    line-height: 100px;
    text-align: center;
  }
  .avatar {
    display: block;
  }
}
</style>
