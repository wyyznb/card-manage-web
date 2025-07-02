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
        rowKey='id' :pageSizes="[10, 20, 30, 40, 50]" v-model:page="pagination.page"
        v-model:size="pagination.limit" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
      </custom-table>
    </div>
    <!-- 添加平台 -->
    <AddPlat
      v-model:visible="showPerDialogVisible"
      :perForm="perForm"
      @confirmUser="confirmUser"
    />
  </div>
</template>
<script setup lang="ts">
import AddPlat from './components/AddPlat.vue'
import apis from '@/api'

const showPerDialogVisible = ref<boolean>(false)
const perForm = ref<any>({
  title: '',
})
interface Pagination {
  page: number
  limit: number
}
const pagination = reactive<Pagination>({
  page: 1,
  limit: 10
})
const loading = ref<boolean>(false)
const total = ref<number>(0)
// 列表列头设置
const columns = [
  {
    prop: 'title',
    label: '平台名称',
    width: 400
  },
  {
    prop: 'id',
    label: 'id',
  }
]

const tableDataSource = ref<any>([])

// 添加平台名称
const addPlat = () => {
  showPerDialogVisible.value = true
}

// 所属平台列表
const getTableDataList = async () => {
  loading.value = true
  try {
    const { code, data = {} } = await apis.platformApi(pagination)
    loading.value = false
    if (!code) {
      total.value = data?.count || 0
      tableDataSource.value = data?.list || []
    }
  } catch (error: any) {
    loading.value = false
    throw new Error(error)
  }
}

// 添加平台成功后执行
const confirmUser = () => {
  pagination.page = 1
  getTableDataList()
}

onMounted(() => {
  getTableDataList()
})

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
