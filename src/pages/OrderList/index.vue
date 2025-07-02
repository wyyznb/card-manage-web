<template>
  <div class="order-list-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="order-main">
      <div class="order-main-top">
        <div class="search-list">
          <div class="order-search">
            <span>订单号</span>
            <el-input
              style="width: 200px;"
              class="search"
              placeholder="请输入订单号"
              v-model.trim="orderData.order_sn"
              clearable
            >
            </el-input>
          </div>
          <div class="order-search">
            <span>手机号</span>
            <el-input
              style="width: 200px;"
              class="search"
              placeholder="请输入手机号"
              v-model.trim="orderData.moblie"
              clearable
            >
            </el-input>
          </div>
          <div class="order-search">
            <span>订单来源</span>
            <el-input
              style="width: 200px;"
              class="search"
              placeholder="请输入订单来源"
              v-model.trim="orderData.order_from"
              clearable
            >
            </el-input>
          </div>
        </div>
        <div class="buttons" @click="handleSearch">
          <el-button type="primary">查询</el-button>
        </div>
      </div>
      <!-- 表格+分页公共组件调用 -->
      <custom-table v-loading="loading" :tableData="tableDataSource" :columns="columns" :total="total"
        rowKey='id' :pageSizes="[10, 20, 30, 40, 50]" v-model:page="pagination.page"
        v-model:size="pagination.limit" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
        <template v-slot:upStatus="{ row }">
          {{ orderStatusData[row.up_status] }}
        </template>
        <template v-slot:operation="{ row }">
          <el-button type="primary" text @click="seeDetail(row.id)">查看</el-button>
        </template>
      </custom-table>
    </div>
    <!-- 查看详情-->
    <OrderDetail
      v-model:visible="showPerDialogVisible"
      :orderId="orderId"
      :orderStatusData="orderStatusData"
    />
  </div>
</template>
<script setup lang="ts">
import OrderDetail from './components/OrderDetail.vue'
import apis from '@/api'

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
const showPerDialogVisible = ref<boolean>(false)
const orderId = ref<number>(0)

// 查询框
const orderData = reactive<any>({
  order_sn: '',
  moblie: '',
  order_from: ''
})


// 列表列头设置
const columns = [
  {
    prop: 'ext_order_sn',
    label: '自有平台订单号',
    width: 150
  },
  {
    prop: 'order_sn',
    label: '外部订单号',
    width: 200
  },
  {
    prop: 'goods_name',
    label: '商品名称',
    width: 200
  },
  {
    prop: 'belong_plat',
    label: '所属平台',
  },
  {
    prop: 'order_from',
    label: '订单来源',
  },
  {
    prop: 'push_status',
    label: '推送状态'
  },
  {
    prop: 'username',
    label: '用户申请姓名',
    width: 150
  },
  {
    prop: 'card',
    label: '身份证号',
    width: 200
  },
  {
    prop: 'moblie',
    label: '手机号',
    width: 200
  },
  {
    prop: 'detailedAddress',
    label: '申请地址',
    width: 250
  },
  {
    prop: 'up_status',
    label: '订单状态',
    type: 'slot',
    slotType: "upStatus",
    width: 100
  },
  {
    prop: 'mark',
    label: '失败原因',
    width: 200
  },
  {
    prop: 'express_name',
    label: '快递名字'
  },
  {
    prop: 'express_sn',
    label: '快递单号',
    width: 200
  },
  {
    prop: 'create_time',
    label: '下单时间',
    width: 180
  },
  {
    prop: 'order_remarks',
    label: '订单备注',
    width: 200
  },
  {
    width: 100,
    type: 'slot',
    slotType: 'options',
    label: "操作按钮",
    fixed: 'right',
  },
]

const orderStatusData = ref<any>({
  0: '未处理',
  1: '开卡中',
  3: '已发货',
  4: '待激活',
  5: '待证件上传',
  6: '开卡失败',
  8: '已激活',
  10: '已取消',
  11: '待上传证件'
})

const tableDataSource = ref<any>([])

// 订单列表
const getTableDataList = async () => {
  loading.value = true
  try {
    const { code, data = {} } = await apis.orderApi({
      ...pagination,
      ...orderData
    })
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

//查询
const handleSearch = () => {
  pagination.page = 1
  getTableDataList()
}

// 查看详情
const seeDetail = (id: number) => {
  orderId.value = id
  showPerDialogVisible.value = true
}

onMounted(() => {
  getTableDataList()
})

</script>
<style lang="scss" scoped>
.order-main{
  background-color: #fff;
  border-radius: 6px;
  border: 1px #f1f1f1 solid;
  padding: 15px;
  box-sizing: border-box;
  margin-top: 30px;
  .order-main-top{
    padding-bottom: 15px;
    margin-bottom: 15px;
    border-bottom: 1px #f5f5f5 solid;
    display: flex;
    align-items: center;
    padding-bottom: 15px;
    border-bottom: 1px #f5f5f5 solid;
    display: flex;
    align-items: center;
    .search-list{
      display: flex;
      gap: 0 20px;
      .order-search{
        color: #333;
        font-size: 14px;
        display: flex;
        align-items: center;
        gap: 0 10px;
      }
    }
    .buttons{
      margin-left: auto;
    }
  }
}
</style>
