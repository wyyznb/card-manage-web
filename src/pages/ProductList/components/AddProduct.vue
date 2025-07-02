  <template>
    <el-dialog
      class="product-manage"
      :model-value="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      title="编辑商品"
      width="700"
      align-center
      @close="handleClose"
    >
      <el-form size="large" :inline="true" ref="perFormRef" :model="perForm">
        <el-form-item 
          label="商品编码："
          prop="code"
          :rules="[
            { required: true, message: '请输入商品编码', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.code" disabled />
        </el-form-item>
        <el-form-item 
          label="头图："
          prop="title_picture"
          :rules="[
            { required: true, message: '请输入头图url地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.title_picture"  placeholder="请输入头图url地址" />
        </el-form-item>
        <el-form-item 
          label="产品名称："
          prop="goods_name"
          :rules="[
            { required: true, message: '请输入自有产品名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.goods_name"  placeholder="请输入自有产品名称" />
        </el-form-item>
        <el-form-item 
          label="商品详情："
          prop="product_details"
          :rules="[
            { required: true, message: '请输入详情图片地址', trigger: 'blur' }
          ]"
        >
          <el-input type="textarea" v-model="perForm.product_details"  placeholder="请输入详情图片地址" />
        </el-form-item>
        <el-form-item 
          label="所属平台："
          prop="platform"
          :rules="[
            { required: true, message: '请选择所属平台', trigger: 'change' }
          ]"
        >
            <el-select
              v-model="perForm.platform"
              placeholder="请选择"
              @change="searchTable"
            >   
              <el-option
                v-for="item in platList"
                :key="item.id"
                :label="item.name"
                :value="item.name"
              />
          </el-select>
        </el-form-item>
        <el-form-item 
          label="产品亮点："
          prop="high_light"
          :rules="[
            { required: true, message: '请输入产品亮点', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.high_light"  placeholder="请输入产品亮点" />
        </el-form-item>
        <el-form-item 
          label="商品备注："
          prop="point"
          :rules="[
            { required: true, message: '请输入商品备注', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.point"  placeholder="请输入商品备注" />
        </el-form-item>
        <el-form-item 
          label="原月租："
          prop="yuanyuezu"
          :rules="[
            { required: true, message: '请输入原月租', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.yuanyuezu"  placeholder="请输入原月租" />
        </el-form-item>
        <el-form-item 
          label="优惠后月租："
          prop="youhuiyuezu"
          :rules="[
            { required: true, message: '请输入优惠后月租', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.youhuiyuezu"  placeholder="请输入优惠后月租" />
        </el-form-item>
        <el-form-item 
          label="通用流量："
          prop="tongyong"
          :rules="[
            { required: true, message: '请输入通用流量数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.tongyong"  placeholder="请输入通用流量数" />
        </el-form-item>
        <el-form-item 
          label="定向流量数："
          prop="dingxiang"
          :rules="[
            { required: true, message: '请输入定向流量数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.dingxiang"  placeholder="请输入定向流量数" />
        </el-form-item>
        <el-form-item 
          label="通话分钟数："
          prop="fenzhong"
          :rules="[
            { required: true, message: '请输入通话分钟数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.fenzhong"  placeholder="请输入通话分钟数" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleGoodsSave" :loading="loading">完成</el-button>
        </div>
      </template>
    </el-dialog>
  </template>
  <script lang="ts" setup>
  import apis from '@/api'
  import { myMessage } from '@/utils/resetMessage'
  
  const emit = defineEmits(['update:visible', 'confirmUser'])
  const props = defineProps({
    visible:{
      type: Boolean,
      default: false
    },
    perForm: {
      type: Object,
      default: {}
    }
  })
  const platList = ref<any[]>([{
    id: 1,
    name: '号易'
  },{
    id: 2,
    name: '国古'
  }])
  const loading = ref<boolean>(false)

  // 关闭弹窗，重置数据
  const handleClose = () => {
    emit('update:visible', false)
  }

  // 商品保存
  const handleGoodsSave = async (id: any, status: any) => {
    loading.value = true
    try {
      const { code, msg } = await apis.goodsSaveApi(props.perForm)
      loading.value = false
      if (!code) {
        myMessage({message: msg, type:'success'})
        handleClose()
        emit('confirmUser')
      }
    } catch (error: any) {
      loading.value = false
      throw new Error(error)
    }
  }

  // 所属平台
  const searchTable = () => {

  }
  </script>
  <style scoped lang="scss">
 .product-manage{
    .mt-10{
      margin-top: 10px;
    }
    .el-form-item{
      width:100%;
      margin: 10px 0;
    }
  }
  :deep(.el-form-item__label){
    width: 165px;
    text-align: right;
  }
  </style>