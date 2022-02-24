<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 23:27:34
 * @LastEditTime: 2022-02-13 23:28:29
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\views\UserCenter\UserInfo\index.vue
 * 生命不息，代码不止
-->
<template>
  <div class="user-info">
    <el-card>
      <div
        slot="header"
        class="clearfix"
      >
        <span>{{ showORedit ? "用户信息" : "编辑用户信息" }}</span>
        <el-button
          v-if="!showORedit"
          style="float: right; padding: 3px 0;margin-left:20px"
          type="text"
          @click="cancel"
        >
          取消
        </el-button>
        <el-button
          style="float: right; padding: 3px 0"
          type="text"
          @click="showOReditClick"
        >
          {{ showORedit ? "编辑用户信息" : "保存" }}
        </el-button>
      </div>
      <show-user
        v-if="showORedit"
        :user-info="userInfo"
      />
      <edit-user
        v-else
        ref="edit"
        :user-info="userInfo"
        @close="close"
      />
    </el-card>
  </div>
</template>

<script>
import ShowUser from "./Show.vue";
import EditUser from "./Edit.vue";
import { mapGetters } from "vuex";
export default {
  name: "UserInfo",
  components: {
    EditUser,
    ShowUser
  },
  data() {
    return {
      showORedit: true,
      userInfo: {}
    };
  },
  computed: {
    ...mapGetters(["userInfo"])
  },
  created() {
    this.init();
  },
  methods: {
    async init() {
      if (!this.$store.getters.userInfo) {
        this.userInfo = await this.$store.dispatch("user/resetInfo");
      } else {
        this.userInfo = this.$store.getters.userInfo;
      }
    },
    showOReditClick() {
      if (this.showORedit) {
        this.showORedit = false;
      } else {
        // edit
        this.$refs.edit.submitForm();
      }
    },
    // 关闭编辑状态
    close(param) {
      this.showORedit = param;
    },
    // 取消
    cancel() {
      this.userInfo = this.$options.data().userInfo;
      this.showORedit = true;
    }
  }
};
</script>

<style></style>
