<template>
  <div>
    <v-filter @search="handleSearch" @clickAdd="handleOpenDialog" />
    <div class="container">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="index"  align="center" width="55" label="序号"/>
        <el-table-column prop="userName"  align="center" label="姓名"/>
        <el-table-column prop="nick_name"  align="center" label="昵称" />
        <el-table-column prop="mobile"  align="center" label="手机号" />
        <el-table-column prop="userType"  align="center" label="用户类型">
          <template slot-scope="{row}">
            {{row.userType | getUserType}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleOpenDialog(dialogType.modify, scope.row)" type="text">编辑</el-button>
            <!-- <el-button class="del_text" @click="handleClickDel" type="text">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>

      <div class="page_box">
        <el-pagination 
          @current-change="handleCurrentChange"
          :current-page.sync="params.current"
          layout="total, prev, pager, next"
          :page-size="10"
          :total="Number(total)"
        >
        </el-pagination>
      </div>
    </div>

      <el-dialog
        :title="title"
        :visible.sync="dialogVisible"
        width="30%"
        :before-close="handleClose"
        :close-on-click-modal="false"
      >
        <el-form v-if="dialogVisible" ref="formParam" :model="formParam" :rules="rules" label-width="110px" size="small">
          <el-form-item label="用户类型：" prop="userType">
            <el-radio-group v-model="formParam.userType">
              <el-radio :label="'' + userType.shopkeeper">店主</el-radio>
              <el-radio :label="'' + userType.shopManager">店长</el-radio>
              <el-radio :label="'' + userType.shopAssistant">店员</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="用户名：" prop="userName">
            <el-input v-model.trim="formParam.userName"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nick_name">
            <el-input v-model.trim="formParam.nick_name"></el-input>
          </el-form-item>
          <el-form-item label="手机号：" prop="mobile">
            <el-input v-model.trim="formParam.mobile"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="pass">
            <el-input type="password" v-model.trim="formParam.pass"></el-input>
          </el-form-item>
        </el-form>

          <span slot="footer" class="dialog-footer">
            <el-button size="small" @click="dialogVisible = false">取 消</el-button>
            <el-button size="small" type="primary" @click="handleSubmit('formParam')">确 定</el-button>
          </span>
      </el-dialog>
  </div>
</template>

<script>
import Filter from './filter.vue'
import { getMisUserPage } from '@/api'
import { userType, dialogType } from '@/const/type'
import { addMisUser, editMisUser } from '@/api'
import { mapGetters } from 'vuex'
import { PHONE } from '@/utils/reg'

        
const userTypeList = [userType.shopkeeper, userType.shopManager, userType.shopAssistant]
export default {
  components: {
    'v-filter': Filter
  },
  computed: {
    ...mapGetters(['merchantsId'])
  },
  data() {
    return {
      userType,
      dialogType,
      rules: {
        userType: [{required: true, message: '请选择用户类型', trigger: 'change'}],
        userName: [{required: true, message: '请填写用户名', trigger: 'blur'}],
        nickName: [{required: true, message: '请填写昵称', trigger: 'blur'}],
        mobile: [
          {required: true, message: '请填写手机号', trigger: 'blur'},
          {pattern: PHONE,  message: '请填写正确的手机号码', trigger: 'blur'}
        ],
        pass: [{required: true, message: '请填写密码', trigger: 'blur'}],
      },
      title: '添加店员',
      dialogVisible: false,
      formParam: {},
      params: null,
      tableData: [],
      total: 0,
      userTypeList,
    }
  },
  filters: {
    getUserType(type) {
      switch (type) {
        case userType.shopkeeper:
          return '店主'
        case userType.shopManager:
          return '店长'
        case userType.shopAssistant:
          return '店员'
        default:
          return '-'
      }
    }
  },
  created() {
    this.reload()
  },
  methods: {
    // 重新加载
    reload() {
      this.params = {
        current: 1,
        size: 10,
        userName: '',
        userTypeList: this.userTypeList
      }
      this.reloadForm()
      this.getTableData()
    },
    reloadForm() {
      this.formParam = {
        userName: '',
        userType: undefined,
        mobile: '',
        merchantsId: this.merchantsId,
        pass: '',
        nick_name: '',
      }
    },
    handleSearch({userName}) {
      this.params.userName = userName
      this.params.current = 1
      this.getTableData()
    },
    getTableData() {
      getMisUserPage(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleCurrentChange(cur) {
      this.params.current = cur
      this.getTableData()
    },
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if(!this.formParam.id) {
            this.handleClickAdd()
          } else {
            this.handleClickEdit()
          }
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 添加用户
    handleClickAdd() {
      addMisUser(this.formParam).then(res => {
        this.$message.success('添加成功')
        this.reload()
       this.dialogVisible = false
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 编辑用户
    handleClickEdit() {
      editMisUser(this.formParam).then(res => {
        this.$message.success('编辑成功')
        this.reload()
        this.dialogVisible = false
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    // 删除用户
    handleClickDel() {
      this.$confirm('此操作将删除此用户无法恢复, 是否继续?', '提示',{
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(res => {
        
      })
    },
    handleOpenDialog(type) {
      this.reloadForm()
      if (type == this.dialogType.modify) {
        this.formParam = JSON.parse(JSON.stringify(arguments[1]))
      }
      this.dialogVisible = true
    },
    handleClose() {
      this.dialogVisible = false
    },
  }
}
</script>

<style lang="scss" scoped>

</style>