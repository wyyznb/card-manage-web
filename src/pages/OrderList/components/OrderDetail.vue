  <template>
    <el-dialog
      class="order-manage"
      :model-value="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      title="订单信息"
      width="700"
      align-center
      @close="handleClose"
    >
      <el-form size="large" :inline="true" v-loading="loading">
        <el-form-item 
          label="自有平台订单号："
        >
          <span>{{ orderDetailData.ext_order_sn }}</span>
        </el-form-item>
        <el-form-item 
          label="外部订单号："
        >
          <span>{{ orderDetailData.order_sn }}</span>
        </el-form-item>
        <el-form-item 
          label="商品名称："
        >
          <span>{{ orderDetailData.goods_name }}</span>
        </el-form-item>
        <el-form-item 
          label="商品编码："
        >
          <span>{{ orderDetailData.goods_id }}</span>
        </el-form-item>
        <el-form-item 
          label="所属平台："
        >
          <span>{{ orderDetailData.belong_plat }}</span>
        </el-form-item>
        <el-form-item 
          label="推送状态："
        >
          <span>{{ orderDetailData.push_status }}</span>
        </el-form-item>
        <el-form-item 
          label="订单来源："
        >
          <span>{{ orderDetailData.order_from }}</span>
        </el-form-item>
        <el-form-item 
          label="用户姓名："
        >
          <span>{{ orderDetailData.username }}</span>
        </el-form-item>
        <el-form-item 
          label="身份证号："
        >
          <span>{{ orderDetailData.card }}</span>
        </el-form-item>
        <el-form-item 
          label="手机号："
        >
          <span>{{ orderDetailData.number }}</span>
        </el-form-item>
        <el-form-item 
          label="申请地址："
        >
          <span>{{ orderDetailData.detailedAddress }}</span>
        </el-form-item>
        <el-form-item 
          label="订单状态："
        >
          <span>{{ orderStatusData[orderDetailData.up_status] }}</span>
        </el-form-item>
        <el-form-item 
          label="失败原因："
        >
          <span>{{ orderDetailData.mark }}</span>
        </el-form-item>
        <el-form-item 
          label="快递名字："
        >
          <span>{{ orderDetailData.express_name }}</span>
        </el-form-item>
        <el-form-item 
          label="快递单号："
        >
          <span>{{ orderDetailData.express_sn }}</span>
        </el-form-item>
        <el-form-item 
          label="下单时间："
        >
          <span>{{ orderDetailData.create_time }}</span>
        </el-form-item>
        <el-form-item 
          label="订单备注："
        >
          <span>{{ orderDetailData.order_remarks }}</span>
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="submit">完成</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script lang="ts" setup>
  import apis from '@/api'
  const emit = defineEmits(['update:visible'])
  const props = defineProps({
    visible: {
      type: Boolean,
      default: false
    },
    orderId: {
      type: Number,
      default: 0
    },
    orderStatusData: {
      type: Object,
      default: {}
    }
  })
  const orderDetailData = ref<any>({})
  const loading = ref<boolean>(false)

  // 关闭弹窗，重置数据
  const handleClose = () => {
    emit('update:visible', false)
  }

  // 完成
  const submit = () => {
    emit('update:visible', false)
  }

  // 订单详情
  const queryOrderDetail = async () => {
    loading.value = true
    try {
      const { data = {} } = await apis.orderInfoApi({
        id: props.orderId
      })
      loading.value = false
      orderDetailData.value = data || {}
    } catch (error: any) {
      loading.value = false
      throw new Error(error)
    }
  }

  watch(() => props.visible, () => {
    if (props.visible) {
      queryOrderDetail()
    }
  })
  </script>
  <style scoped lang="scss">
 .order-manage{
    .el-form-item{
      width: 100%;
      margin: 0;
    }
  }
  :deep(.el-form-item--large .el-form-item__content){
    line-height: 25px;
  }
  :deep(.el-form-item__label){
    width: 165px;
    text-align: right;
  }
  </style>