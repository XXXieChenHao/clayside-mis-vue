<template>
  <div class="merchantList">
    <div class="input_suffix">
      标签名称：
      <el-input
        size="small"
        v-model="params.name"
        class="search_ipt"
        placeholder="请输入标签名称"
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
        新建标签
      </el-button>
    </div>
    <div class="container">
      <el-table :data="tableData" style="width: 100%" :row-class-name="tableRowClassName">
        <el-table-column type="index" label="序号" align="center"></el-table-column>
        <el-table-column prop="name" label="标签名称" align="center"></el-table-column>
        <el-table-column label="标签状态" align="center">
          <template slot-scope="{row}">
           {{row.enable | getEnable}}
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="mini" @click="handleOpenDialog(dialogType.modify, scope.row)">编辑</el-button>
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
      :title="getDialogStatus ?'创建标签': '修改标签'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form v-if="dialogVisible" ref="formParam" :model="formParam" :rules="rules" label-width="120px" size="small">
        <el-form-item label="标签名称：" prop="name">
          <el-input v-model="formParam.name" placeholder="请填写标签名称"></el-input>
        </el-form-item>
        <el-form-item label="启用：" prop="enable">
          <el-radio-group v-model="formParam.enable">
            <el-radio :label="0">禁用</el-radio>
            <el-radio :label="1">启用</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSubmit('formParam')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { pageCommodityTag, addCommodityTag, editCommodityTag } from '@/api'
import { dialogType } from '@/const/type'
import { mapGetters } from 'vuex'

export default {
  name: 'LabelManage',
  computed: {
    getDialogStatus() {
      return this.dialogStatus == this.dialogType.create
    },
    ...mapGetters(['merchantsId'])
  },
  components: {
  },
  filters: {
    getEnable(param) {
      return param  == 1? '启用' : '禁用'
    }
  },
  created() {
    this.init()
  },
  data() {
    return {
      dialogVisible: false,
      tableData: [],
      total: 0,
      rules: {
        enable: [{required: true, message: '请选择启用状态', trigger: 'change'}],
        name: [{required: true, message: '请填写标签名称', trigger: 'blur'},
        {max: 16, message: '标签最长为16位', trigger: 'change'}]
      },
      formParam: null,
      dialogStatus: undefined,
      dialogType
    }
  },
  methods: {
    init() {
      this.resetParam()
      this.resetForm()
      this.getTableData()
    },
    resetParam() {
      this.params = {
        current: 1,
        size: 10,
        name: '',
        merchantsId: this.merchantsId
      }
    },
    // 获取列表数据
    getTableData() {
      pageCommodityTag(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    // 点击确认
    handleSubmit(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.dialogStatus == dialogType.create ? this.createTag():  this.editTag()  
        } else {
          return false
        }
      })
    },
    // 编辑提交
    editTag() {
      editCommodityTag(this.formParam).then(res => {
        this.$message.success('修改成功')
        this.dialogVisible = false
        this.reload()
      })
    },
    // 新建提交
    createTag() {
      addCommodityTag(this.formParam).then(res => {
        this.$message.success('创建成功')
        this.dialogVisible = false
        this.reload()
      })
    },
    // 搜索
    handleSearch() {
      this.reload()
    },
    resetForm() {
      this.formParam = {
        name: '', // 标签名称
        enable: undefined,  // 0禁用 1启用
      } 
    },
    reload() {
      this.resetForm()
      this.params.current = 1
      this.getTableData()
    },
    // 开启选单
    handleOpenDialog(type) {
      if (type == this.dialogType.modify) {
        let data = JSON.parse(JSON.stringify(arguments[1]));
        this.formParam = data
      } else {
        this.resetForm()
      }
      this.dialogStatus = type
      this.dialogVisible = true
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