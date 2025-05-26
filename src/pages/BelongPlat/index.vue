<template>
  <div class="plat-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>所属平台</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="plat-main">
      <div class="plat-main-top">
        <div class="add-plat" @click="addPlat">
          <el-button type="primary" plain> + 添加平台</el-button>
        </div>
      </div>
      <!-- 表格+分页公共组件调用 -->
      <custom-table v-loading="loading" :tableData="tableDataSource" :columns="columns" :total="total"
        rowKey='id' :pageSizes="[20, 40, 60, 80, 100]" v-model:page="pagination.pageIndex"
        v-model:size="pagination.pageSize" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
      </custom-table>
    </div>
    <!-- 添加平台 -->
    <AddPlat
      v-model:visible="showPerDialogVisible"
      :perForm="perForm"
    />
  </div>
</template>
<script setup lang="ts">
import AddPlat from './components/AddPlat.vue' 

const showPerDialogVisible = ref<boolean>(false)
const perForm = ref<any>({
  name: '',
})
interface Pagination {
  pageIndex: number
  pageSize: number
}
const pagination = reactive<Pagination>({
  pageIndex: 1,
  pageSize: 20
})
const loading = ref<boolean>(false)
const total = ref<number>(4)
// 列表列头设置
const columns = [
  {
    prop: 'name',
    label: '平台名称',
    width: 400
  },
  {
    prop: 'id',
    label: 'id',
  }
]

const tableDataSource = ref<any>([{
  id: '1',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx3.sinaimg.cn/large/0060M1TRly1i1bxz89gh1j30ft0kwti6.jpg',
  name: '号易',
  plat: '移动',
  orderId: 12,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312312,
  status: 1
},{
  id: '这个id是我们自己站的id，显示不显示均可',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '对接的平台名字，目前只有一个平台',
  plat: '移动',
  orderId: 24,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 0
}])

// 添加平台名称
const addPlat = () => {
  showPerDialogVisible.value = true
}

// 列表接口方法
const getTableDataList = () => {

}

</script>
<style lang="scss" scoped>
.plat-main{
  background-color: #fff;
  border-radius: 6px;
  border: 1px #f1f1f1 solid;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 30px;
  .plat-main-top{
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px #f5f5f5 solid;
    display: flex;
    align-items: center;
  }
}
</style>
