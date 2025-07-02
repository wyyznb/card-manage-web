<template>
  <div class="product-list-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="product-main">
      <!-- <div class="product-main-top">
        <div class="product-search">
          <span>产品名称</span>
          <el-input
            style="width: 200px;"
            class="search"
            placeholder="请输入产品名称"
            v-model.trim="productName"
            clearable
            @clear="onSearch"
            @keyup.enter="onSearch"
          >
          </el-input>
        </div>
        <div class="buttons">
          <el-button type="primary">查询</el-button>
          <el-button>重置</el-button>
        </div>
      </div> -->
      <!-- <div class="add-product" @click="addProduct">
        <el-button type="primary" plain> + 编辑商品</el-button>
      </div> -->
      <!-- 表格+分页公共组件调用 -->
      <custom-table v-loading="loading" :tableData="tableDataSource" :columns="columns" :total="total"
        rowKey='id' :pageSizes="[10, 20, 30, 40, 50]" v-model:page="pagination.page"
        v-model:size="pagination.limit" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
        <template v-slot:imageUrl="{ row }">
          <img class="img-box" v-if="row.title_picture" :src="row.title_picture" alt="">
        </template>
        <template v-slot:status="{ row }">
          {{ row.status === 1 ? '上架中' : '已下架' }}
        </template>
        <template v-slot:operation="{ row }">
          <el-button @click="addProduct(row)" type="primary" text>编辑</el-button>
          <el-popconfirm
            width="200"
            title="确定要删除该条商品？"
            placement="top"
            @confirm="deleteProduct(row)"
          >
            <template #reference>
              <el-button type="primary" text>删除</el-button>
            </template>
          </el-popconfirm>
          <el-button type="primary" text v-if="row.status === 2" @click="handleAction(row.id, 1)">上架</el-button>
          <el-button type="primary" text v-if="row.status === 1" @click="handleAction(row.id, 2)">下架</el-button>
          <el-button type="primary" text @click="goExclusive(row)">专属链接</el-button>
        </template>
      </custom-table>
    </div>
    <!-- 添加商品 -->
    <AddProduct
      v-model:visible="showPerDialogVisible"
      :perForm="perForm"
      @confirmUser="getTableDataList"
    />
  </div>
</template>
<script setup lang="ts">
import AddProduct from './components/AddProduct.vue'
import { myMessage } from '@/utils/resetMessage'
import apis from '@/api'

interface Pagination {
  page: number
  limit: number
}
const pagination = reactive<Pagination>({
  page: 1,
  limit: 10
})
const productName = ref<any>('')
const loading = ref<boolean>(false)
const total = ref<number>(0)
const showPerDialogVisible = ref<boolean>(false)
const perForm = ref<any>({})

// 列表列头设置
const columns = [
  {
    prop: 'code',
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
    width: 300
  },
  {
    prop: 'product_details',
    label: '详情',
    width: 400
  },
  {
    prop: 'platform',
    label: '所属平台',
    width: 120
  },
  {
    prop: 'high_light',
    label: '产品亮点',
    width: 200
  },
  {
    prop: 'point',
    label: '商品备注',
    width: 260
  },
  {
    prop: 'yuanyuezu',
    label: '原月租',
    width: 100
  },
  {
    prop: 'youhuiyuezu',
    label: '优惠后月租',
    width: 100
  },
  {
    prop: 'tongyong',
    label: '通用流量',
    width: 100
  },
  {
    prop: 'dingxiang',
    label: '定向流量',
    width: 100
  },
  {
    prop: 'fenzhong',
    label: '通话分钟数',
    width: 100
  },
  {
    prop: 'status',
    label: '上架状态',
    type: 'slot',
    slotType: "status"
  },
  {
    width: 240,
    type: 'slot',
    slotType: 'options',
    label: "操作按钮",
    fixed: 'right',
  },
]

const tableDataSource = ref<any>([])

// 产品名称搜索
const onSearch = () => {
  
}

// 商品列表
const getTableDataList = async () => {
  loading.value = true
  try {
    const { code, data = {} } = await apis.goodsApi(pagination)
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

// 商品操作[上架/下架]
const handleAction = async (id: any, status: any) => {
  try {
    const { code, msg } = await apis.actionApi({
      id,
      status
    })
    if (!code) {
      myMessage({message: msg, type: 'success'})
      getTableDataList()
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

// 删除商品
const deleteProduct = async (row: any) => {
  try {
    const { code, msg } = await apis.goodsDeleteApi({
      id: row.id,
    })
    if (!code) {
      myMessage({message: msg, type: 'success'})
      pagination.page = 1
      getTableDataList()
    }
  } catch (error: any) {
    throw new Error(error)
  }
}

// 编辑商品
const addProduct = (row: any) => {
  perForm.value = {...row}
  showPerDialogVisible.value = true
}

// 专属链接
const goExclusive = (row: any) => {
  const link = `${import.meta.env.VITE_APP_BASE_LINK}/detail.html?goods_id=${row.id}&from=`
  window.open(link)
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
