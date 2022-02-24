<template>
  <div class="filter">
    <div class="input_suffix" v-if="userInfo.userType == 0">
      商户名称：
      <el-select
        size="small"
        v-model="merchantsId"
        filterable
        remote
        reserve-keyword
        placeholder="请输入商户名称"
        :remote-method="remoteMethod"
        :loading="loading">
        <el-option
          v-for="item in storeNameList"
          :key="item.id"
          :label="item.merchantsName"
          :value="item.id">
        </el-option>
      </el-select>
    </div>
    <div class="input_suffix">
      分类名称：
      <el-input
        v-model="searchName"
        size="small"
        class="search_ipt"
        placeholder="请输入分类名称"
        prefix-icon="el-icon-search"
      />
    </div>
    <div class="search_suffix">
       <el-button
        type="primary"
        size="small"
        @click="handleSearch"
      >
        搜 索
      </el-button>

      <el-button
        type="primary"
        size="small"
        @click="dialogVisible = true"
      >
        添加分类
      </el-button>
    </div>
    <el-dialog
      :title="title"
      :visible.sync="dialogVisible"
      width="40%"
      :close-on-click-modal="false"
      :destroy-on-close="true"
      :before-close="handleClose"
    >
      <el-form ref="form" :model="params" label-width="120px">
        <el-form-item label="分类名称">
          <el-input v-model="params.name" placeholder="请填写分类名称"></el-input>
        </el-form-item>
        <el-form-item label="分类级别">
          <el-radio-group v-model="params.level">
            <el-radio :label="LEVEL.parent">一级</el-radio>
            <el-radio :label="LEVEL.children">二级</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="父级分类" v-if="params.level == LEVEL.children">
          <el-select v-model="params.parentId" placeholder="请选择父级分类">
            <el-option v-for="item in parentType" :label="item.name" :key="item.id" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上下架">
          <el-switch v-model="params.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="排序">
          <el-input v-model.number="params.typeSort" placeholder="请输入排序"></el-input>
        </el-form-item>
         <el-form-item label="描述">
          <el-input type="textarea" placeholder="请填写分类描述" v-model="params.describes"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSubmit">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const LEVEL = {
  parent: '1',
  children: '2'
}

defineProps({
  parentType: {
    type: Array,
    default: []
  }
})

const userInfo = computed(() => {
  return {
    userType: 1
  }
})
// import { addCommodityType, editCommodityType, listMerchantsByName } from '@/api'
// import { mapGetters } from 'vuex';
// export default {
//   props: ['parentType'],
//   computed: {
//     ...mapGetters(['userInfo'])
//   },
//   data() {
//     return {
//       LEVEL,
//       merchantsId: '',  // 商户 Id
//       searchName: '',
//       dialogVisible: false,
//       params: {},
//       title: '添加分类',
//       loading: false,
//       storeNameList: [],  //  商户列表
//     }
//   },
//   mounted() {
//     this.params.merchantsId = this.$store.getters.merchantsId
//   },
//   methods: {
//     load() {
//       this.title = '添加分类'
//       this.params = {
//         name: '', // 分类名称
//         level: '1',  // 级别 1-一级 2-二级
//         isShelves: 0, // 上下架 0-下架 1-商家
//         typeSort: undefined, // 排序
//         merchantsId: this.$store.getters.merchantsId,
//         parentId: undefined,  // 父级ID
//         describes: '',  // 描述
//         delivery: 0,
//       }
//     },
//     handleClose() {
//       this.dialogVisible = false
//     },
//     onSubmit() {
//       if(!this.params.id) {
//         this.handleClickAdd()
//       } else {
//         this.handleClickEdit()
//       }
//     },
//     handleClickAdd() {
//       addCommodityType(this.params).then(res => {
//         this.$message.success('创建成功')
//         this.load()
//         this.dialogVisible = false
//         this.$emit('reload')
//       }).catch(err => {
//         this.$message.error(err.message)
//       })
//     },
//     handleClickEdit() {
//       editCommodityType(this.params).then(res => {
//         this.$message.success('修改成功')
//         this.load()
//         this.dialogVisible = false
//         this.$emit('reload')
//       }).catch(err => {
//         this.$message.error(err.message)
//       })
//     },
//     // 点击检索
//     handleSearch() {
//       this.$emit('search', {
//         merchantsId: this.merchantsId,
//         searchName: this.searchName,
//       })
//     },
//     // 编辑
//     editClass(data) {
//       this.title = '修改分类'
//       this.params = data
//       this.dialogVisible = true
//     },
//     remoteMethod(query) {
//       if (query !== '') {
//         this.loading = true;

//         listMerchantsByName({
//           name: query
//         }).then(res => {
//           this.loading = false;
//           this.storeNameList = res.data;
//         })
//       } else {
//         this.loading = false;
//         this.storeNameList = [];
//       }
//     }
//   }
// };
</script>

<style lang="scss" scoped>
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
  width: 100%;
  text-align: left;
  background: #fff;
  padding: 10px 20px;
  border-radius: 10px;
}
</style>
