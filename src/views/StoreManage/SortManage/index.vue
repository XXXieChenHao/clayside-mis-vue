<template>
  <div>
    <Header
      :parentType="parentType"
      @search="search"
      @reload="reload"
      ref="header"
    />
    <div class="sort_contatin">
       <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        default-expand-allrecords
        :tree-props="{children: 'childTypeList'}"
      >
        <el-table-column label="分类级别" prop="level" align="center">
          <template slot-scope="{row}">
            {{row.level | getTypeLevel}}
          </template>
        </el-table-column>
        <el-table-column label="分类名称" prop="name" align="center"></el-table-column>
        <el-table-column label="分类状态" prop="isShelves" align="center">
          <template slot-scope="{row}">
            {{row.isShelves | getIsShelves}}
          </template>
        </el-table-column>
        <el-table-column label="排序" prop="typeSort" align="center"></el-table-column>
        <el-table-column label="分类描述" width="180" prop="describes" align="center"></el-table-column>
        <el-table-column label="操作" width="160" align="center">
          <template slot-scope="scope">
            <el-button type="primary" @click="editClass(scope.row)" icon="el-icon-edit" size="mini" />
            <!-- <el-button type="danger" @click="delClass(scope.row.id)" icon="el-icon-delete" size="mini" /> -->
          </template>
        </el-table-column>
      </el-table>
      <div class="page_box">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page.sync="params.current"
          :page-size="10"
          layout="total, prev, pager, next"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Header from './header.vue';
import { reactive, ref } from 'vue'
// 导入 service
import { commodityLevelList } from '@/service/StoreManage/index'


const parentType = ref([]);

const commodityTypeId = ref('');
const tableDatae = ref([]);
const params = reactive({
  name: '',
  current: 1,
  size: 10,
})
const total = ref(0)

const getCommodityType = () => {
  console.log(commodityLevelList())
}

getCommodityType()



// import { pageCommodityType, listCommodityTypeByLevel, delCommodityType } from '@/api'
// export default {
//   name: 'SortMange',
//   components: {
//     "v-header": Header
//   },
//   filters :{
//     getIsShelves(isShelves) {
//       return isShelves == 1? '上架' : '下架'
//     },
//     getTypeLevel(level) {
//         return level == 1 ? '一级' : '二级'
//     }
//   },
//   data() {
//     return {
//       parentType: [],
//       commodityTypeId: '',
//       tableData: [],
//       params: {
//         name: '',
//         current: 1,
//         size: 10,
//       },
//       total: 0
//     }
//   },
//   created() {
//     this.getTypeList()
//     this.getParentType()
//   },
//   methods: {
//     reload() {
//       this.getTypeList()
//     },
//     getTypeList() {
//       pageCommodityType(this.params).then(res => {
//         this.tableData = res.data.records
//         this.total = +res.data.total
//       })
//     },
//     // 获取一级父分类
//     getParentType() {
//       listCommodityTypeByLevel({level: 1}).then(res => {
//         this.parentType = res.data
//       })
//     },
//     search({searchName, merchantsId}) {
//       this.params.name = searchName
//       this.params.merchantsId = merchantsId
//       this.getTypeList()
//     },
//     handleCurrentChange(cur) {
//       this.params.current = cur
//       this.getTypeList()
//     },
//     editClass(row) {
//       this.$refs.header.editClass(JSON.parse(JSON.stringify(row)))
//     },
//     delClass(id) {
//       this.$confirm('此操作将删除此条记录无法恢复, 是否继续?', '提示', {
//         confirmButtonText: '确定',
//         cancelButtonText: '取消',
//         type: 'warning'
//       }).then(() => {
//         delCommodityType({
//           id
//         }).then(res => {
//           this.$message.success('删除成功')
//           this.getTypeList()
//         }).catch(err => {
//           this.$message.error(err.message)
//         })
//       })
//     }
//   }
// };
</script>

<style lang="scss" scoped>
.sort_contatin {
  background: #fff;
  padding: 20px;
  margin-top: 20px;
}
</style>
