<template>
  <div class="product-list-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>号易商品</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="product-main">
      <!-- 表格+分页公共组件调用 -->
      <custom-table v-loading="loading" :tableData="tableDataSource" :columns="columns" :total="total"
        rowKey='id' v-model:page="pagination.page"
        v-model:size="limit" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
        <template v-slot:imageUrl="{ row }">
          <img class="img-box" v-if="row.title_picture" :src="row.title_picture" alt="">
        </template>
        <template v-slot:platform="{ row }">
          {{ '号易' }}
        </template>
        <template v-slot:operation="{ row }">
          <el-button type="primary" text @click="addProduct(row)">添加</el-button>
        </template>
      </custom-table>
    </div>
  </div>
</template>
<script setup lang="ts">
import { myMessage } from '@/utils/resetMessage'
import apis from '@/api'

interface Pagination {
  page: number
}
const pagination = reactive<Pagination>({
  page: 1
})
const limit: number = 15
const productName = ref<any>('')
const loading = ref<boolean>(false)
const total = ref<number>(0)
const showPerDialogVisible = ref<boolean>(false)
const perForm = ref<any>({
  bianma: '',
  name: '',
  imageUrl: '',
  age: '',
  plat: '',
  productTag: '',
  productName: ''
})

// 列表列头设置
const columns = [
  {
    prop: 'id',
    label: '商品编码',
    width: 120
  },
  {
    prop: 'title_picture',
    label: '头图',
    type: 'slot',
    slotType: "imageUrl",
    width: 120
  },
  {
    prop: 'goods_name',
    label: '产品名称',
    width: 400
  },
  {
    prop: 'product_details',
    label: '详情',
    width: 400
  },
  {
    prop: 'platform',
    label: '所属平台',
    slotType: "platform",
    width: 120
  },
  {
    prop: 'point',
    label: '产品亮点',
    width: 200
  },
  {
    width: 200,
    type: 'slot',
    slotType: 'options',
    label: "操作按钮",
    fixed: 'right',
  },
]

const tableDataSource = ref<any>([])

// 商品列表
const getTableDataList = async () => {
  loading.value = true
  try {
    const { code, data = {} } = await apis.otherGoodsApi(pagination)
    loading.value = false
    if (!code) {
      total.value = data?.total || 0
      tableDataSource.value = data?.data || []
    }
  } catch (error: any) {
    loading.value = false
    throw new Error(error)
  }
}

// 添加商品
const addProduct = async (row: any) => {
  try {
    const { code, msg } = await apis.otherAddApi({ id: row.id })
    if (!code) {
      myMessage({message: msg, type:'success'})
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

onMounted(() => {
  getTableDataList()
})

</script>
<style lang="scss" scoped>
.product-main{
  background-color: #fff;
  border-radius: 6px;
  border: 1px #f1f1f1 solid;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 30px;
  :deep(.el-pagination__sizes){
    display: none;
  }
  .product-main-top{
    padding-bottom: 15px;
    border-bottom: 1px #f5f5f5 solid;
    display: flex;
    align-items: center;
    .product-search{
      color: #333;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 0 5px;
    }
    .buttons{
      margin-left: auto;
    }
  }
  .add-product{
    padding: 15px 0;
  }
  .img-box {
    width: 80px;
    height: 80px;
  }
}
</style>
