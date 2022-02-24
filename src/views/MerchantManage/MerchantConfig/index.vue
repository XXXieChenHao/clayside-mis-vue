<template>
  <div>
    <div class="input_suffix">
      配置名称：
      <el-input
        size="small"
        v-model="params.name"
        class="search_ipt"
        placeholder="请输入配置名称"
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
    <div class="form_box">
      <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="120px">
        <el-form-item
          v-for="(domain, index) in dynamicValidateForm.domains"
          :key="index"
          class="dynamic"
          :label="domain.name + '：'"
        >
          <!-- <el-input style="width: 120px" :readonly="true" v-model="domain.name" placeholder="请输入 key 值"></el-input> -->
          <!-- <el-input style="width: 120px" :readonly="true" v-model="domain.name" placeholder="请输入 key 值"></el-input> -->

          <div class="type_radio" v-if="domain.type == 'radio'">
            <el-radio v-model="domain.configValue" :disabled="editorArr.indexOf(index) == -1" label="1">是</el-radio>
            <el-radio v-model="domain.configValue" :disabled="editorArr.indexOf(index) == -1" label="0">否</el-radio>
          </div>
          <el-input  style="width: 240px"  :disabled="editorArr.indexOf(index) == -1" v-else-if="domain.type == 'input'" v-model="domain.configValue" placeholder="请输入 value 值"></el-input>
          <el-button class="right_btn" size="small" type="success" v-if="editorArr.indexOf(index) != -1"  @click.prevent="handleSave(index)">保存</el-button>
          <el-button class="right_btn" size="small" type="primary" v-else @click.prevent="handleEditor(index)">修改</el-button>
        </el-form-item>
        <el-form-item>
          <!-- <el-button type="primary" @click="submitForm('dynamicValidateForm')">提交</el-button> -->
          <!-- <el-button @click="addDomain">新增配置</el-button> -->
        </el-form-item>
      </el-form>
      <div style="text-align: left; margin-left: 20px">
         <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page.sync="params.current"
          :page-size="10"
          :pager-count="5"
          layout="prev, pager, next, total"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import { getPageMerchants, saveMerchantsConfig } from '@/api'
  export default {
    name: 'MerchantConfig',
    data() {
      return {
        dynamicValidateForm: {
          domains: [],
        },
        params: {
          current: 1,
          name: '',
          size: 10,
        },
        total: 0,
        editorArr: [],
      };
    },
    created() {
      this.init()
    },
    methods: {
      async init() {
        await getPageMerchants(this.params).then(res => {
          this.dynamicValidateForm.domains = res.data.records
          this.total = Number(res.data.total)
        })
      },
      // 保存
      handleSave(index) {
        let eq = this.editorArr.indexOf(index)
        this.editorArr.splice(eq,1)

        let data = this.dynamicValidateForm.domains[index]
        saveMerchantsConfig(data).then(res => {
          console.log(res)
        })
      },
      handleEditor(index) {
        this.editorArr.push(index)
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
            console.log( this.dynamicValidateForm.domains)
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      removeDomain(item) {
        var index = this.dynamicValidateForm.domains.indexOf(item)
        if (index !== -1) {
          this.dynamicValidateForm.domains.splice(index, 1)
        }
      },
      addDomain() {
        this.dynamicValidateForm.domains.push({
          value: '',
          key: ''
        });
      },
      handleSearch() {
        this.init()
      },
      handleCurrentChange(cur) {
        this.params.current = cur
        this.init()
      }
    }
  }
</script>
<style lang="scss" scoped>
.form_box {
  background: #fff;
  margin-top: 20px;
  padding-top: 20px;
  padding-bottom: 30px;

  .config_title {
    margin: 0 20px;
    padding: 20px 0;
    font-size: 22px;
    color: #666;
  }

  .el-form {
    width: 500px;
    // margin: 0 auto;
  }

  .dynamic {
    .el-input {
      margin-right: 0px;
      width: 270px;
      vertical-align: top;
    }
  }
}


  .input_suffix {
    display: inline-block;
    & + .input_suffix {
      margin-left: 20px;
    }
    .search_ipt {
      width: 260px;
    }
  }
  .search_suffix {
    display: inline-block;
    margin-left: 20px;
  }

.right_btn {
  margin-left: 20px;
}

.type_radio {
  width: 240px;
  display: inline-block;
  margin-right: 3px;
}

</style>
