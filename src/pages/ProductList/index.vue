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
          <el-button @click="addProduct" type="primary" text>编辑</el-button>
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
    prop: 'bianma',
    label: '商品编码（接口请求回来的id）',
    width: 150
  },
  {
    prop: 'imageUrl',
    label: '头图',
    type: 'slot',
    slotType: "imageUrl",
    width: 100
  },
  {
    prop: 'name',
    label: '产品名称',
    width: 300
  },
  {
    prop: 'detail',
    label: '详情',
    width: 120
  },
  
  {
    prop: 'plat',
    label: '所属平台',
  },
  {
    prop: 'productTag',
    label: '产品亮点',
    width: 200
  },
  {
    prop: 'productName',
    label: '商品备注',
    width: 360
  },
  {
    prop: 'oldRent',
    label: '原月租',
    width: 100
  },
  {
    prop: 'newRent',
    label: '优惠后月租',
    width: 100
  },
  {
    prop: 'tongyongliuliang',
    label: '通用流量',
    width: 100
  },
  {
    prop: 'dingxiangliuliang',
    label: '定向流量',
    width: 100
  },
  {
    prop: 'tonghuashu',
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
    width: 200,
    type: 'slot',
    slotType: 'options',
    label: "操作按钮",
    fixed: 'right',
  },
]

const tableDataSource = ref<any>([{
  bianma: '77777554545',
  id: 1,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx3.sinaimg.cn/large/0060M1TRly1i1bxz89gh1j30ft0kwti6.jpg',
  name: 'N电信星花卡29元185G长期套餐',
  detail: '详情是编辑器添加的多图片，这里无需显示',
  plat: '号易',
  productTag: '5G畅享速率',
  productName: '29元185G+100分钟发货率高，政策全网最优，年龄：19-55周岁',
  oldRent: 29,
  newRent: 19,
  tongyongliuliang: 155,
  dingxiangliuliang: 30,
  tonghuashu: 100,
  status: 1
},{
  bianma: '商品编码是从接口取过来的',
  id: 2,
  imageUrl: 'https://image.baidu.com/search/down?thumburl=https://baidu.com&url=https://wx4.sinaimg.cn/large/0060M1TRly1i1busl224rj30em0lptms.jpg',
  name: '头图和产品名称都是可以编辑的',
  detail: '详情是编辑器添加的多图片，这里无需显示',
  plat: '号易',
  productTag: '全国高速流量',
  productName: '29元185G+100分钟发货率高，政策全网最优，年龄：19-55周岁',
  oldRent: 39,
  newRent: 29,
  tongyongliuliang: 205,
  dingxiangliuliang: 30,
  tonghuashu: 0,
  status: 0
}]);


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
