<template>
  <div class="edit-user">
    <el-form
      ref="form"
      :rules="rules"
      :model="userInfo"
      label-width="135px"
    >
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="item">
            <el-form-item
              label="用户名："
              prop="sellerName"
            >
              <el-input
                v-model="userInfo.sellerName"
                :disabled="true"
              />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">
            <el-form-item
              label="昵称"
              prop="nickName"
            >
              <el-input v-model="userInfo.nickName" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="item">
            <el-form-item
              label="真实姓名："
              prop="trueName"
            >
              <el-input v-model="userInfo.trueName" />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">
            <el-form-item
              label="身份证号："
              prop="incorrectLoginNumber"
            >
              <el-input v-model="userInfo.incorrectLoginNumber" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <div class="item">
            <el-form-item
              label="手机号："
              prop="telephone"
            >
              <el-input
                v-model="userInfo.telephone"
                :disabled="true"
              />
            </el-form-item>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="item">
            <el-form-item label="电子邮箱：">
              <el-input v-model="userInfo.sellerMail" />
            </el-form-item>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="6">
          <div class="head_img">
            <el-form-item label="用户头像：">
              <upload-image class="store-logo" />
            </el-form-item>
          </div>
          <div class="el-upload__tip">
            只能上传jpg/png文件，建议宽高为（{{ width }}*{{ height }}）像素
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>

<script>
import UploadImage from "@/components/UploadImage/index.vue";
export default {
  name: "EditUser",
  components: {
    UploadImage
  },
  props: {
    userInfo: {
      default: {},
      type: Object,
      require: true
    }
  },
  data() {
    return {
      rules: {
        sellerName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        nickName: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        trueName: [
          { required: true, message: "请输入真实姓名", trigger: "blur" }
        ],
        telephone: [
          { required: true, message: "请输入手机号码", trigger: "blur" }
        ],
        incorrectLoginNumber: [
          { required: true, message: "请输入身份证号", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          // alert('submit!');
          this.$emit("close", true);
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.edit-user {
  padding-bottom: 30px;
  .store-logo {
    width: 100px;
    height: 100px;
  }

  .el-upload__tip {
    position: absolute;
    left: 140px;
    top: 110px;
  }
}
</style>
