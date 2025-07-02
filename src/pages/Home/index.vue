<template>
  <div class="index-page">
    <el-breadcrumb separator=">">
      <el-breadcrumb-item>首页</el-breadcrumb-item>
    </el-breadcrumb>
    <div class="index-main flex">
      <div class="order-list">
        <div
          class="item-bg order-item"
          v-for="item in orderList"
          :key="item.id"
        >
          <div class="order-item-info">
            <div class="info">
              <div class="num">{{ item.name }}</div>
              <div class="value">{{ item.value }}</div>
            </div>
            <img :src="getImageUrl(item.icon)">
          </div>
          <!-- <div class="order-item-time">
            <span>更新至 {{ item.date }}</span>
            <el-icon :size="12"><ArrowRight /></el-icon>
          </div> -->
        </div>
      </div>
      <div class="statistics-list">
        <div class="item-bg statistics-item">
          <div class="name">
            <span><img :src="getImageUrl(orderStatisticsInfo.icon)"></span>
            {{ orderStatisticsInfo.name }}
          </div>
          <div class="order-status-lst">
            <div class="item">
              待发货订单：
              <span>{{ orderStatisticsInfo.pendingShipmentCount || 0 }} 个</span>
            </div>
            <div class="item">
              已发货订单：
              <span>{{ orderStatisticsInfo.alreadyShippedCount || 0 }} 个</span>
            </div>
            <div class="item">
              已激活订单：
              <span>{{ orderStatisticsInfo.activeCount || 0 }} 个</span>
            </div>
            <div class="item">
              失败订单：
              <span>{{ orderStatisticsInfo.failCount || 0 }} 个</span>
            </div>
          </div>
        </div>
        <div class="item-bg statistics-item">
          <div class="name">
            <span><img :src="getImageUrl(productStatisticsInfo.icon)"></span>
            {{ productStatisticsInfo.name }}
          </div>
          <div class="order-status-lst">
            <div class="item">
              商品总数：
              <span>{{ productStatisticsInfo.allCount || 0 }} 个</span>
            </div>
            <div class="item">
              上架商品：
              <span>{{ productStatisticsInfo.alreadyListedCount || 0 }} 个</span>
            </div>
            <div class="item">
              下架商品：
              <span>{{ productStatisticsInfo.removedCount || 0 }} 个</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import apis from '@/api'
//订单列表
const orderList = ref<any[]>([
  {
    id: 1,
    key: 'orderTodayCount',
    name: '今日订单量',
    value: 0,
    icon: 'today_order_icon',
    date: '2025-05-28'
  },
  {
    id: 2,
    key: 'orderYesterdayCount',
    name: '昨日订单量',
    value: 0,
    icon: 'yestoday_order_icon',
    date: '2025-05-27'
  },
  {
    id: 3,
    key: 'orderAllCount',
    name: '总订单量',
    value: 0,
    icon: 'total_order_icon',
    date: '2025-05-28'
}])

// 订单统计信息
const orderStatisticsInfo = ref<any>({
  name: '订单统计信息',
  icon: 'order_statistics_icon'
})

// 商品统计信息
const productStatisticsInfo = ref<any>({
  name: '商品统计信息',
  icon: 'product_statistics_icon'
})

const getImageUrl = (fileName: string) => {
  return new URL(`../../assets/images/${fileName}.jpg`, import.meta.url).href
}

// 统计
const queryHome = async () => {
  const { code, data = {} } = await apis.homeApi({})
  if (!code) {
    orderList.value.forEach((item: any) => {
      item.value = data?.[item.key] || 0
    })
    orderStatisticsInfo.value = {
      ...data.order,
      ...orderStatisticsInfo.value
    }
    productStatisticsInfo.value = {
      ...data.goods,
      ...productStatisticsInfo.value
    }
  }
}

onMounted(() => {
  queryHome()
})

</script>
<style lang="scss" scoped>
.index-main{
  margin-top: 50px;
  display: flex;
  flex-direction: column;
  gap: 15px 0;
  .item-bg{
    width: calc((100% - 30px) / 3);
    background-color: #fff;
    border-radius: 6px;
    border: 1px #f1f1f1 solid;
    padding: 15px;
    box-sizing: border-box;
  }
  .order-list{
    width: 70%;
    display: flex;
    gap: 0 15px;
    .order-item{
      .order-item-info{
        display: flex;
        .info{
          display: flex;
          flex-direction: column;
          width: 0;
          flex: 1;
          gap: 5px 0;
          .num{
            color: #8d8d8d;
            font-size: 14px;
          }
          .value{
            color: #333;
            font-size: 20px;
          }
        }
        &>img{
          width: 28px;
          height: 28px;
        }
      }
      .order-item-time{
        margin-top: 25px;
        display: flex;
        align-items: center;
        &>span{
          font-size: 12px;
          color: #8d8d8d;
        }
        .el-icon{
          margin-left: auto;
          color: #8d8d8d;
        }
      }
    }
  }
  .statistics-list{
    width: 70%;
    display: flex;
    gap: 0 15px;
    .statistics-item{
      .name{
        font-size: 16px;
        color: #333;
        display: flex;
        align-items: center;
        gap: 0 10px;
        &>span{
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background-color: #e7edfa;
          display: flex;
          align-items: center;
          justify-content: center;
          &>img{
            width: 15px;
            height: 15px;
          }
        }
      }
      .order-status-lst{
        margin-top: 10px;
        display: flex;
        flex-direction: column;
        gap: 10px 0;
        .item{
          display: flex;
          align-items: center;
          font-size: 14px;
          color: #8d8d8d;
          &>span{
            flex: 1;
            color: #333;
            text-align: right;
          }
        }
      }
    }
  }
}
</style>
