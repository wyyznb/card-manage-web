<template>
  <div class="product-list-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      <el-breadcrumb-item>商品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="product-main">
      <div class="product-main-top">
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
      </div>
      <div class="add-product" @click="addProduct">
        <el-button type="primary" plain> + 添加商品</el-button>
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
          {{ row.status ? '上架中' : '已下架' }}
        </template>
        <template v-slot:operation="{ row }">
          <el-button type="primary" text>上架</el-button>
          <el-button type="primary" text>下架</el-button>
          <el-button type="primary" text>专属链接</el-button>
        </template>
      </custom-table>
    </div>
    <!-- 添加商品 -->
    <AddProduct
      v-model:visible="showPerDialogVisible"
      :perForm="perForm"
    />
  </div>
</template>
<script setup lang="ts">
import AddProduct from './components/AddProduct.vue' 

interface Pagination {
  pageIndex: number
  pageSize: number
}
const pagination = reactive<Pagination>({
  pageIndex: 1,
  pageSize: 20
})
const productName = ref<any>('')
const loading = ref<boolean>(false)
const total = ref<number>(4)
const showPerDialogVisible = ref<boolean>(false)
const perForm = ref<any>({
  id: '',
  name: '',
  imageUrl: '',
  age: '',
  plat: '',
  productId: '',
  productName: ''
})

// 列表列头设置
const columns = [
  {
    prop: 'imageUrl',
    label: '主图',
    type: 'slot',
    slotType: "imageUrl",
    width: 100
  },
  {
    prop: 'id',
    label: '商品本站id',
    width: 120
  },
  {
    prop: 'name',
    label: '自有产品名称(18-65周岁)',
    width: 300
  },
  {
    prop: 'plat',
    label: '所属平台',
  },
  {
    prop: 'productId',
    label: '所属平台的商品id',
    width: 200
  },
  {
    prop: 'productName',
    label: '所属平台的产品名称',
    width: 360
  },
  {
    prop: 'status',
    label: '自有平台商品状态',
    type: 'slot',
    slotType: "status"
  },
  {
    width: 200,
    type: 'slot',
    slotType: 'options',
    label: "操作按钮",
    fixed: 'right',
  },
]

const tableDataSource = ref<any>([{
  id: 1,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx3.sinaimg.cn/large/0060M1TRly1i1bxz89gh1j30ft0kwti6.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  productId: 12,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 1
},{
  id: 2,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  productId: 24,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 0
},{
  id: 3,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '联通',
  productId: 34,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 0
},{
  id: 4,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  productId: 89,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 1
},{
  id: 4,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  productId: 89,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 1
},{
  id: 4,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '大陆国行，支持联通移动',
  plat: '移动',
  productId: 89,
  productName: '大陆国行，支持联通移动大陆国行，支持联通移动',
  status: 1
}])


// 产品名称搜索
const onSearch = () => {
  console.log('搜索的内容')
}

// 列表接口方法
const getTableDataList = () => {

}

// 添加商品
const addProduct = () => {
  showPerDialogVisible.value = true
}

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
    width: 40px;
    height: 40px;
  }
}
</style>
