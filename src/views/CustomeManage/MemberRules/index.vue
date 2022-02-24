<template>
  <div>
    <div class="search_suffix">
       <el-button
        type="primary"
        size="small"
        @click="handleAdd"
      >
        新增会员规则
      </el-button>
    </div>
    <div class="container">
      <el-table
        :data="tableData"
      >
        <el-table-column type="index" label="序号" width="65" align="center"/>
        <el-table-column prop="name" label="规则名称" align="center"/>
        <el-table-column prop="duration" label="会员时长" align="center">
          <template slot-scope="{row}">{{row | getDuration}}</template>
        </el-table-column>
        <el-table-column prop="originalPrice" label="会员费用（元）" align="center"/>
        <el-table-column prop="status" label="规则状态" align="center">
          <template slot-scope="{row}">{{row | getStatus}}</template>  
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button @click="handleEdit(row)" type="text">编辑</el-button>
            <el-button @click="handleDel(row)" class="del_text" type="text">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          layout="prev, pager, next, total"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>

    <el-dialog
      :title=" !formParam.id ? '新增规则' : '修改规则'"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
    >
      <el-form ref="ruleForm"  :rules="rules" :model="formParam" label-width="120px" size="small">
        <el-form-item label="规则名称: " prop="name">
          <el-input placeholder="请输入规则名称" v-model="formParam.name" />
        </el-form-item>


        <el-form-item label="会员时长: " prop="duration">
           <el-input placeholder="请输入会员时长" v-model.number="formParam.duration" class="input-with-select">
            <el-select style="width: 6em" v-model="formParam.unit" slot="append" placeholder="请选择">
              <el-option v-for="(val, key, index) in UNIT" :key="index" :value="key" :label="val"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="会员费用: " prop="originalPrice">
          <el-input placeholder="请输入会员费用" v-model.number="formParam.originalPrice">
            <template slot="append">元</template>
          </el-input>  
        </el-form-item>
        <el-form-item label="规则状态: " prop="status">
          <el-select v-model="formParam.status" placeholder="请选择此规则状态">
            <el-option v-for="(val, key, index) in STATUS" :key="index" :label="val" :value="Number(key)"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注: ">
          <el-input type="textarea" v-model="formParam.remark" />
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="createRules('ruleForm')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { saveVipPolicy, pageVipPolicy, disableVipPolicy } from '@/api'
const UNIT = {
  DAY: '天',
  MONTH: '月',
  YEAR: '年'
}

const STATUS = {
  0: '草稿',
  1: '发布',
  2: '下线'
}
export default {
  name:'',
  computed: {
     ...mapGetters(['merchantsId'])
  },
  filters: {
    getDuration({duration, unit}) {
      return `${duration} ${UNIT[unit]}`
    },
    getStatus({status}) {
      return STATUS[status]
    }
  },
  watch: {

  },
  data() {
      return {
        UNIT,
        STATUS,
        rules: {
          name: [{required: true, message: '请输入规则名称', trigger: 'blur'}],
          duration: [{required: true, message: '请输入会员时长', trigger: 'blur'}],
          status: [{required: true, message: '请选择规则状态', trigger: 'blur'}],
          originalPrice: [{required: true, message: '请输入会员费用', trigger: 'blur'}],
        },
        total: 0,
        tableData: [],
        dialogVisible: false,
        formParam: {},
        params: {
          current: 1,
          pageSize: 10,
          isDelete: 0
        }
    };
  },
  created() {
    this.getTableData()
  },
  mounted() {
    this.renderForm()
  },
  methods: {
    renderForm() {
      this.formParam = {
        unit: 'DAY',
        name: '',
        status: undefined,
        duration: undefined,  // 时间
        originalPrice: undefined, // 钱
        remark: '', // 备注
        merchantsId: String(this.merchantsId)
      }
    },
    reset() {
      this.renderForm()
      this.params = {
        current: 1,
        pageSize: 10,
        isDelete: 0
      }
    },
    // 新增
    handleAdd() {
      this.renderForm()
      this.dialogVisible = true
    },
    // 编辑
    handleEdit(row) {
      this.renderForm()
      let data = JSON.parse(JSON.stringify(row))
      // this.formParam = data
      for(let k in this.formParam) {
        this.formParam[k] = data[k]
      }
      this.formParam.id = data.id
      this.dialogVisible = true
    },
    // 删除
    handleDel({id}) {
        this.$confirm('此操作将会删除此会员规则, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          disableVipPolicy({id}).then(res => {
            this.reset()
            this.getTableData()
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });

    },
    // 新增规则 
    createRules(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.formParam.id ? this.editPolicy() : this.savePolicy()
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    // 保存
    savePolicy() {
      saveVipPolicy(this.formParam).then(res => {
        if(res.code === 200) {
          this.$message.success(`新增成功`)
          this.dialogVisible = false
          this.reset()
          this.getTableData()
        } else {
          this.$message.warning(`新增失败，请重试`)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    editPolicy() {
      saveVipPolicy(this.formParam).then(res => {
        if(res.code === 200) {
          this.$message.success(`修改成功`)
          this.dialogVisible = false
          this.getTableData()
        } else {
          this.$message.warning(`修改失败，请重试`)
        }
      }).catch(err => {
        this.$message.error(err.message)
      })
    },
    getTableData() {
      pageVipPolicy(this.params).then(res => {
        this.tableData = res.data.records
        this.total = res.data.total
      })
    },
    handleCurrentChange(val) {
      this.params.current = val
      this.getTableData()
    }
  },
};
</script>

<style scoped lang="scss">
   ::v-deep .el-input-group__append {
     width: 6em;
     text-align: center;
   }
</style>
