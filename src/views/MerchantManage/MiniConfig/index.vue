<template>
  <div>
    <div class="search_suffix">
       <el-button
        type="primary"
        size="small"
        @click="handleAdd"
      >
        新增小程序
      </el-button>
    </div>
    <div class="form_box">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column align="center" type="index" label="序号" width="70"/>
        <el-table-column align="center" label="小程序名称">
          <template slot-scope="scope">
            <el-input :disabled="getEdit(scope.$index)" v-model="tableData[scope.$index].name" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="小程序appId">
          <template slot-scope="scope">
            <el-input :disabled="getEdit(scope.$index)" v-model="tableData[scope.$index].appId" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="商户Id">
          <template slot-scope="scope">
            <el-input :disabled="getEdit(scope.$index)" v-model="tableData[scope.$index].merchantsId" />
          </template>
        </el-table-column>
        <el-table-column align="center" label="小程序密钥">
         <template slot-scope="scope">
            <el-input :disabled="getEdit(scope.$index)" v-model="tableData[scope.$index].appSecret" />
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100" align="center">
          <template slot-scope="scope">
            <div v-if="scope.row.isDelete == 1">
              <i class="tip_text is_delete">已删除</i>
            </div>
            <div v-else>
               <el-button v-if="editArr.indexOf(scope.$index) == -1" type="text" @click="handleEdit(scope.$index)" size="small">编辑</el-button>
              <el-button v-else type="text"  @click="handleSave(scope)" size="small"><i class="save_text">保存</i></el-button>
              <el-button v-if="editArr.indexOf(scope.$index) == -1" type="text"  @click="handleDel(scope.$index)" size="small"><i class="del_text">删除</i></el-button>
            </div>
           
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          layout="prev, pager, next, total"
          :total="total">
        </el-pagination>
      </div>
    </div>

    <el-dialog
      title="新增小程序"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form ref="form" :model="formParam" label-width="120px">
        <el-form-item label="小程序名称：">
          <el-input v-model="formParam.name" placeholder="请填写小程序名称"></el-input>
        </el-form-item>
        <el-form-item label="小程序Id：">
          <el-input v-model="formParam.appId" placeholder="请填写小程序appId"></el-input>
        </el-form-item>
        <el-form-item label="商户Id：">
          <el-input v-model="formParam.merchantsId" placeholder="请填写商户Id"></el-input>
        </el-form-item>
        <el-form-item label="小程序密钥：">
          <el-input v-model="formParam.appSecret" placeholder="请填写小程序密钥"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createMini">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { wechatAppletGetByPage, saveWechatAppletById, addWechatApplet } from "@/api";

const source = { id: '', name: '', appId: '', appSecret: '', merchantsId: ''}
export default {
  name: 'MiniConfig',
  data() {
    return {
      params: {
        current: 1,
        size: 10
      },
      total: 0,
      tableData: [],
      editArr: [],
      dialogVisible: false,
      formParam: {
        name: '',
        appId: '',
        merchantsId: '',
        appSecret: '',
      }
    };
  },
  computed: {
    getEdit() {
     return function(eq) {
        return this.editArr.indexOf(eq) == -1
     }
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      wechatAppletGetByPage(this.params).then(res => {
        this.tableData = res.data.records
        this.total = +res.data.total
      })
    },
    handleEdit(eq) {
      this.editArr.push(eq)
    },
    handleDel(eq) {
      this.$confirm('此操作将删除此条记录无法恢复, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.tableData[eq].isDelete = 1
          saveWechatAppletById(this.tableData[eq]).then(res => {
            this.$message.success("删除成功")
            this.params.current = 1
            this.init()
          }).catch(err => {
            this.init()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    // 保存
    handleSave(scope) {
      let eq = scope.$index
      saveWechatAppletById(this.tableData[eq]).then(res => {
        this.$message.success("保存成功")
        this.editArr.splice(this.editArr.indexOf(eq), 1)
      }).catch(err => {
        this.init()
      })
    },
    handleAdd() {
      this.formParam = {
        name: '',
        appId: '',
        merchantsId: '',
        appSecret: '',
      }
      this.dialogVisible = true
    },
    // 新增
    createMini() {
      addWechatApplet(this.formParam).then(res => {
        this.$message.success('新增成功')
        this.params.current = 1
        this.dialogVisible = false
        this.init()
      }).catch(err => {
        this.$message.error(err.message)
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.form_box {
  background: #fff;
  margin-top: 20px;
  padding: 40px;

  .config_title {
    margin: 0 20px;
    padding: 20px 0;
    font-size: 22px;
    color: #666;
  }
}

.page_box {
  text-align: center;
  margin: 40px 0 0px;
}

.search_suffix {
  display: inline-block;
}

.is_delete {
  font-size: 12px;
  text-decoration:line-through; 
}
</style>
