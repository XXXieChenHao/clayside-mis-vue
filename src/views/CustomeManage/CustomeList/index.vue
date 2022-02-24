<!--
 * @Author: xie chenhao
 * @Date: 2022-02-13 23:27:34
 * @LastEditTime: 2022-02-17 19:44:15
 * @LastEditors: xie chenhao
 * @Description: 
 * @FilePath: \clayside-mis-vue\src\views\CustomeManage\CustomeList\index.vue
 * 生命不息，代码不止
-->
<template>
  <div>
    <v-filter></v-filter>
    <div class="container">
      <el-table
        :data="tableData"
        style="width: 100%"
      >
        <el-table-column type="index" label="序号"/>
        <el-table-column prop="nickName" label="昵称"/>
        <el-table-column prop="mobile" label="联系方式" />
        <el-table-column prop="phone" label="是否会员" />
        <el-table-column prop="phone" label="是否付押金" />
        <el-table-column label="会员操作" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.alreadyVip == '否'" type="text" @click="memberChange">成为会员</el-button>
            <el-button v-else type="text" @click="memberChange">会员退款</el-button>
          </template>
        </el-table-column>
        <el-table-column label="押金操作"  align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.alreadyDepositMoney == '否'" type="text"  @click="cashChange">付款押金</el-button>
            <el-button v-else type="text"  @click="cashChange">押金退款</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
// import { getUserPage } from '@/api'
import Filter from './filter.vue'
export default {
  name: 'CustomeList',
  components: {
    'v-filter': Filter
  },
  data() {
    return {
      tableData: [],
      params: {
        current: 1,
        size: 10,
        userTypeList: [5],
        userName: '',
      },
      total: 0
    }
  },
  created() {
    this.getTableData()
  },
  methods: {
    getTableData() {
      // getUserPage(this.params).then(res => {
      //   this.tableData = res.data.records
      //   this.total = res.data.total
      // })
    },
    // 会员操作
    memberChange() {
      this.message('添加会员成功')
      this.message('会员退款成功')
    },
    // 押金操作
    cashChange() {
      this.message('押金付款成功')
      this.message('押金退款成功')
    },
    message(msg) {
      this.$message.success(msg)
      this.getTableData()
    }
  }
}
</script>

<style lang="scss" scoped>
.container {
}
</style>