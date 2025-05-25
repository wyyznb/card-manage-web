<template>
  <div class="order-list-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="order-main">
      <div class="order-main-top">
        <div class="order-search">
          <span>订单号</span>
          <el-select
            v-model="orderNumber"
            placeholder="请选择订单号"
            filterable
            style="width: 200px"
            @change="onChange"
          >
            <el-option
              v-for="item in orderList"
              :key="item.id"
              :label="item.orderNumber"
              :value="item.orderNumber"
            />
          </el-select>
        </div>
      </div>
      <!-- 表格+分页公共组件调用 -->
      <custom-table v-loading="loading" :tableData="tableDataSource" :columns="columns" :total="total"
        rowKey='id' :pageSizes="[20, 40, 60, 80, 100]" v-model:page="pagination.pageIndex"
        v-model:size="pagination.pageSize" emptyText="抱歉，未查询到您搜索的信息"
        @pagination="getTableDataList">
        <template v-slot:imageUrl="{ row }">
          <img class="img-box" v-if="row.imageUrl" :src="row.imageUrl" alt="">
        </template>
        <template v-slot:status="{ row }">
          {{ row.status ? '成功' : '失败' }}
        </template>
        <template v-slot:numberStatus="{ row }">
          {{ row.status ? '激活' : '办理成功' }}
        </template>
      </custom-table>
    </div>
  </div>
</template>
<script setup lang="ts">
interface Pagination {
  pageIndex: number
  pageSize: number
}
const pagination = reactive<Pagination>({
  pageIndex: 1,
  pageSize: 20
})
const orderNumber = ref<any>('')
const loading = ref<boolean>(false)
const total = ref<number>(4)
// 列表列头设置
const columns = [
  {
    prop: 'id',
    label: '自有平台订单号',
  },
  {
    prop: 'name',
    label: '自有平台商品名称',
    width: 200
  },
  {
    prop: 'plat',
    label: '所属平台',
  },
  {
    prop: 'orderId',
    label: '所属平台订单号',
  },
  {
    prop: 'status',
    label: '推送状态',
    type: 'slot',
    slotType: "status"
  },
  {
    prop: 'orderName',
    label: '用户申请姓名',
  },
  {
    prop: 'phoneNum',
    label: '手机号'
  },
  {
    prop: 'name',
    label: '快递名字'
  },
  {
    prop: 'id',
    label: '快递单号',
  },
  {
    prop: 'status',
    label: '号码状态',
    type: 'slot',
    slotType: "numberStatus"
  },
  {
    prop: 'phoneNum',
    label: '下单时间'
  },
  {
    prop: 'orderName',
    label: '订单备注'
  },
]

const tableDataSource = ref<any>([{
  id: '4235432gqewfdsg',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx3.sinaimg.cn/large/0060M1TRly1i1bxz89gh1j30ft0kwti6.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 12,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312312,
  status: 1
},{
  id: '423543224354325',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 24,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 0
},{
  id: '4235432g54654',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '联通',
  orderId: 34,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312312,
  status: 0
},{
  id: '456546gfdsgqwe',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 89,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 1
},{
  id: '456546gfdsgqwe',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 89,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 1
},{
  id: '456546gfdsgqwe',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 89,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 1
},{
  id: '456546gfdsgqwe',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 89,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 1
},{
  id: '456546gfdsgqwe',
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  orderId: 89,
  orderName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  phoneNum: 15102312341,
  status: 1
}])

const orderList = ref<any[]>([{
  id: 1,
  orderNumber: '324356587858'
},{
  id: 2,
  orderNumber: '324356rtrewt11'
},{
  id: 3,
  orderNumber: '6587858dsadas1'
},{
  id: 4,
  orderNumber: '587fsdaf213213'
},{
  id: 5,
  orderNumber: '243565sdf21321'
}])


// 订单号筛选
const onChange = () => {
  console.log('请选择订单号')
}

// 列表接口方法
const getTableDataList = () => {

}

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
    .order-search{
      color: #333;
      font-size: 14px;
      display: flex;
      align-items: center;
      gap: 0 5px;
    }
  }
}
</style>
