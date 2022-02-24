<template>
  <div class="login">
    <div class="login-main">
      <el-card class="login-card">
        <h2 class="login-title">
          用户登录
        </h2>
        <el-form
          ref="loginFormRef"
          :model="loginForm"
          :rules="rules"
          class="login-form"
        >
          <el-form-item prop="userName">
            <el-input
              v-model="loginForm.userName"
              placeholder="请输入用户名"
            />
          </el-form-item>
          <el-form-item prop="pass">
            <el-input
              v-model="loginForm.pass"
              type="password"
              placeholder="请输入密码"
            />
          </el-form-item>
          <el-form-item>
            <el-button
              class="login-btn"
              type="primary"
              @click="submitForm(loginFormRef)"
            >
              登录
            </el-button>
          </el-form-item>
          <el-form-item>
            <router-link
              style="float:right"
              :to="{ path: '/findPassword' }"
            >
              忘记密码
            </router-link>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
    <Verify
      ref="verifyRef"
      :mode="pop"
      captcha-type="blockPuzzle"
      :img-size="{ width: '330px', height: '155px' }"
      @success="success"
    />
  </div>
</template>
<script lang="ts" setup>
//引入组件
import Verify from "@/components/verifition/Verify.vue";
import { reactive, ref } from "vue";
import { LocationQueryValue, useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import type { ElForm } from 'element-plus'
import { ElMessage } from 'element-plus'

const $store = useStore();
const $router = useRouter();
const $route = useRoute();

const pop = 'pop';

interface LoginForm {
  userName: string;
  pass: string;
  captchaVerification: string;
}
const loginForm = reactive<LoginForm>({
  userName: "",
  pass: "",
  captchaVerification: ""
})

const redirect = ref<string>('')
const otherQuery = ref<any>({})


const getOtherQuery = (query: any) => {
  return Object.keys(query).reduce((acc: any, cur: any) => {
    if (cur !== "redirect") {
      acc[cur] = query[cur];
    }
    return acc;
  }, {});
}


const query = $route.query;
if (query) {
  redirect.value = String(query.redirect);
  otherQuery.value = getOtherQuery(query);
}

const rules = reactive({
 userName: [{ required: true, message: "用户名不能为空" }],
 pass: [{ required: true, message: "密码不能为空" }]
})

type FormInstance = InstanceType<typeof ElForm>
const loginFormRef = ref<FormInstance>()

const verifyRef = ref<any>()

const submitForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.validate((valid) => {
    if (valid) {
      verifyRef.value.show();
    } else {
      console.log('error submit!')
      return false
    }
  })
}

document.onkeypress = function(e) {
  var keycode = document.all ? event.keyCode : e.which;
  if (keycode == 13) {
    submitForm(loginFormRef.value); // 登录方法名
    return false;
  }
};

const devFun = () => {
  loginForm.userName = 'superAdmin'
  loginForm.pass = '9Fdco8jVmJugcypV'
}
interface Window {
  login: any;
}
(window as any).login = devFun;




const success = ({ captchaVerification }) => {
  loginForm.captchaVerification = captchaVerification;
  $store
    .dispatch("user/login", loginForm)
    .then(() => {
      $store.dispatch("user/getUserInfo");
      console.log('继续')
      $router.push({
        path: redirect.value || "/",
        query: otherQuery.value || {}
      });
    })
    .catch(err => {
      ElMessage.error("登录失败");
    });
}

// export default {
//   name: "App",
//   components: {
//     Verify
//   },
//   data() {
//     return {
//       rules: {
//         userName: [{ required: true, message: "用户名不能为空" }],
//         pass: [{ required: true, message: "密码不能为空" }]
//       },
//       loginForm: {
//         userName: "",
//         pass: "",
//         captchaVerification: ""
//       },
//       pop: "pop",
//       redirect: undefined,
//       otherQuery: {}
//     };
//   },
//   created() {
//     const query = this.$route.query;
//     if (query) {
//       this.redirect = query.redirect;
//       this.otherQuery = this.getOtherQuery(query);
//     }

//     let that = this;
//     document.onkeypress = function(e) {
//       var keycode = document.all ? event.keyCode : e.which;
//       if (keycode == 13) {
//         that.submitForm("loginForm"); // 登录方法名
//         return false;
//       }
//     };
//     window.login = this.devFun
//   },
//   methods: {
//     devFun() {
//       this.loginForm.userName = 'superAdmin'
//       this.loginForm.pass = '9Fdco8jVmJugcypV'
//     },
//     success({ captchaVerification }) {
//       this.loginForm.captchaVerification = captchaVerification;
//       this.$store
//         .dispatch("user/login", this.loginForm)
//         .then(() => {
//           this.$store.dispatch("user/getUserInfo");
//           this.$router.push({
//             path: this.redirect || "/",
//             query: this.otherQuery
//           });
//         })
//         .catch(err => {
//           this.$message.error("登录失败");
//         });
//     },
//     submitForm(formName) {
//       this.$refs[formName].validate(valid => {
//         if (valid) {
//           this.$refs.verify.show();
//         } else {
//           console.log("用户信息填写有误");
//           return false;
//         }
//       });
//     },
//     // 获取地址栏参数
//     getOtherQuery(query) {
//       return Object.keys(query).reduce((acc, cur) => {
//         if (cur !== "redirect") {
//           acc[cur] = query[cur];
//         }
//         return acc;
//       }, {});
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.login {
  position: absolute;
  width: 100%;
  height: 100%;
  .login-main {
    background-image: url("~@/assets/login_bg.jpg");
    background-repeat: no-repeat;
    background-size: 100% 100%;
    background-position: center;
    position: relative;
    width: 100%;
    height: 100%;

    .login-card {
      width: 350px;
      height: 320px;
      position: absolute;
      top: 50%;
      transform: translate(0, -50%);
      right: 200px;

      ::v-deep .el-card__body {
        padding: 0;
      }

      .login-title {
        font-size: 24px;
        display: block;
        padding: 15px 0;
        margin: 0;
        letter-spacing: 3px;
        text-align: center;
        border-bottom: 1px solid #e4e4e4;
      }

      .login-form {
        padding: 30px 30px 20px;

        ::v-deep .el-input__inner {
          border-radius: 5px 0 0 5px !important;
        }
      }

      .login-btn {
        width: 100%;
      }

      ::v-deep .el-input {
        .el-input__inner {
          padding-left: 35px;
        }
        .el-input__prefix {
          .iconfont {
            font-size: 24px;
          }
        }
      }
    }
  }
}

.dev {
  position: fixed;
  bottom: 0;
  right: 0;
  width: 200px;
  height: 100px;
}
</style>
