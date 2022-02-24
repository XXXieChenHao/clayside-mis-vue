<template>
  <div class="merchantList">
    <div class="input_suffix">
      商户名称：
      <el-input
        size="small"
        v-model="params.merchantsName"
        class="search_ipt"
        placeholder="请输入商户名称"
        prefix-icon="el-icon-search"
      />
    </div>
    <div class="search_suffix">
       <el-button
        size="small"
        type="primary"
        plain
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
        新建商户
      </el-button>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" label="序号" align="center" width="55"></el-table-column>
        <el-table-column prop="merchantsName" label="商户名称"></el-table-column>
        <el-table-column prop="merchantsAddress" label="商户地址"></el-table-column>
        <el-table-column prop="merchantsPhone" label="手机号"></el-table-column>
        <el-table-column prop="merchantsGroupNumber" label="商户群号"></el-table-column>
        <el-table-column prop="merchantsProfile" label="商户简介"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleOpenDialog(dialogType.modify, scope.row)">编辑</el-button>
            <el-button type="text" v-if="scope.row.isDelete == 0"  size="mini" @click="handleDelete(scope.row, 1)"><i class="del_text">禁用</i></el-button>
            <el-button type="text" v-else size="mini" @click="handleDelete(scope.row, 0)"><i class="save_text">启用</i></el-button>
          </template>
        </el-table-column>
      </el-table>

     <div class="page">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="params.current"
        :page-size="10"
        layout="total, prev, pager, next"
        :total="Number(total)"
      >
      </el-pagination>
    </div>
    </div>

    <el-dialog
      :title="getDialogStatus ?'创建商户': '修改商户'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form ref="form" :model="formParam" :rules="rules" label-width="100px" size="small">
        <el-form-item label="商户Id：" prop="id">
          <el-input :readonly="!getDialogStatus" :disabled="!getDialogStatus" v-model="formParam.id" placeholder="请填写商户Id">
             <template slot="prepend">66</template>
          </el-input>
        </el-form-item>
        <el-form-item label="商户名称：" prop="merchantsName">
          <el-input v-model="formParam.merchantsName" placeholder="请填写商户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号：" prop="merchantsPhone">
          <el-input v-model="formParam.merchantsPhone" placeholder="请填写手机号"></el-input>
        </el-form-item>
        <el-form-item label="商户地址：">
          <el-input v-model="formParam.merchantsAddress" placeholder="请填写商户地址"></el-input>
        </el-form-item>
        <el-form-item label="商户群号：">
          <el-input v-model="formParam.merchantsGroupNumber" placeholder="请填写商户群号"></el-input>
        </el-form-item>
        <el-form-item label="商户简介：">
          <el-input v-model="formParam.merchantsProfile" placeholder="请填写商户简介"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageMerchants, addMerchants, editMerchants } from '@/api'
import { dialogType } from '@/const/type'
import { mapGetters } from 'vuex'

import { PHONE } from '@/utils/reg'

const defaultForm =  {
    id: '',  // 商户Id
    merchantsAddress: '', // 商户地址
    merchantsName: '',  // 商户名称
    merchantsPhone: '', // 手机号
    merchantsProfile: '', // 商户简介
    merchantsGroupNumber: '', // 商户群号
  } 
export default {
  name: 'MerchantList',
  computed: {
    getDialogStatus() {
      return this.dialogStatus == this.dialogType.create
    },
    ...mapGetters(['merchantsPrevId'])
  },
  components: {
  },
  created() {
    this.init()
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      params: {
        current: 1,
        size: 10,
        merchantsName: ''
      },
      rules: {
        merchantsPhone: [{ required: true, message: '请输入商户手机号', trigger: 'blur' }, {
          pattern: PHONE, message: '请输入正确的手机号',  trigger: 'blur'
        }],
        id: [
          { required: true, message: '请输入商户Id', trigger: 'blur' },
          { max: 100, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
      },
      formParam: JSON.parse(JSON.stringify(defaultForm)),
      dialogStatus: undefined,
      dialogType
    }
  },
  methods: {
    init() {
      this.getTableData()
    },
    // 获取列表数据
    getTableData() {
      pageMerchants(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 点击确认
    handleSubmit() {
      this.formParam.id =  this.merchantsPrevId +  this.formParam.id
      this.dialogStatus == dialogType.create ? this.createMerchants():  this.editMerchants()
    },
    // 编辑提交
    editMerchants() {
      editMerchants(this.formParam).then(res => {
        this.$message.success('修改成功')
        this.dialogVisible = false
        this.reload()
      })
    },
    // 新建提交
    createMerchants() {
      addMerchants(this.formParam).then(res => {
        this.$message.success('创建成功')
        this.dialogVisible = false
        this.reload()
      })
    },
    // 搜索
    handleSearch() {
      this.reload()
    },
    reload() {
      this.formParam = JSON.parse(JSON.stringify(defaultForm))
      this.params.current = 1
      this.getTableData()
    },
    // 开启选单
    handleOpenDialog(type) {
      if (type == this.dialogType.modify) {
        let data = JSON.parse(JSON.stringify(arguments[1]));
        data.id = data.id.slice(2)
        this.formParam = data
      } else {
        this.formParam = {
          id: '',  // 商户Id
          merchantsAddress: '', // 商户地址
          merchantsName: '',  // 商户名称
          merchantsPhone: '', // 手机号
          merchantsProfile: '', // 商户简介
          merchantsGroupNumber: '', // 商户群号
        } 
      }
      this.dialogStatus = type
      this.dialogVisible = true
    },
    // 删除
    handleDelete(data, status) {
      var data = JSON.parse(JSON.stringify(data));
      data.isDelete = status;
      this.$confirm(status == 0 ? '此操作将会启用此商户' : '此操作将会禁用此商户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        editMerchants(data).then(res => {
          this.$message({
            type: 'success',
            message: '操作成功!'
          });
          this.reload()
        })
      }).catch(() => {     
      });
    },
    tableRowClassName({row}) {
      if (row.isDelete == 1) {
        return 'warning-row';
      } else if (row.isDelete == 0) {
        return 'success-row';
      }
      return '';
    },
    // 页码跳转
    handleCurrentChange(cur){
      this.params.current = cur
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.merchantList {
  .input_suffix {
    display: inline-block;
    .search_ipt {
      width: 260px;
    }
  }
  .search_suffix {
    display: inline-block;
    margin-left: 20px;
  }

  .button_suffix {
    display: inline-block;
    margin-left: 50px;
  }

  .container {
    margin-top: 20px;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    .page {
      margin: 20px 0;
      text-align: center;
    }
  }
}
 ::v-deep .el-table .warning-row {
  background: oldlace;
}

//  ::v-deep  .el-table  .success-row {
//   background: #f0f9eb;
// }
</style>