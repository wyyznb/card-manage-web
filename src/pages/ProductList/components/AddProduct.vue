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
          prop="id"
          :rules="[
            { required: true, message: '本id编码不可修改', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.id"  placeholder="本id编码不可修改" />
        </el-form-item>
        <el-form-item 
          label="头图："
          prop="imageUrl"
          :rules="[
            { required: true, message: '请输入头图url地址', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.name"  placeholder="请输入头图url地址" />
        </el-form-item>
        <el-form-item 
          label="产品名称："
          prop="name"
          :rules="[
            { required: true, message: '请输入自有产品名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.name"  placeholder="请输入自有产品名称" />
        </el-form-item>
        <el-form-item 
          label="商品详情："
          prop="detail"
          :rules="[
            { required: true, message: '请输入详情图片地址', trigger: 'blur' }
          ]"
        >
          <el-input type="textarea" v-model="perForm.name"  placeholder="请输入详情图片地址" />
        </el-form-item>
        <el-form-item 
          label="所属平台："
          prop="plat"
          :rules="[
            { required: true, message: '请选择所属平台', trigger: 'change' }
          ]"
        >
            <el-select
              v-model="perForm.plat"
              placeholder="请选择"
              @change="searchTable"
            >   
              <el-option
                v-for="item in platList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              />
          </el-select>
        </el-form-item>
        <el-form-item 
          label="产品亮点："
          prop="productTag"
          :rules="[
            { required: true, message: '请输入产品亮点', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.age"  placeholder="请输入产品亮点" />
        </el-form-item>
        <el-form-item 
          label="商品备注："
          prop="productName"
          :rules="[
            { required: true, message: '请输入商品备注', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.name"  placeholder="请输入商品备注" />
        </el-form-item>
        <el-form-item 
          label="原月租："
          prop="oldRent"
          :rules="[
            { required: true, message: '请输入原月租', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入原月租" />
        </el-form-item>
        <el-form-item 
          label="优惠后月租："
          prop="newRent"
          :rules="[
            { required: true, message: '请输入优惠后月租', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入优惠后月租" />
        </el-form-item>
        <el-form-item 
          label="通用流量："
          prop="tongyongliuliang"
          :rules="[
            { required: true, message: '请输入通用流量数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入通用流量数" />
        </el-form-item>
        <el-form-item 
          label="定向流量数："
          prop="dingxiangliuliang"
          :rules="[
            { required: true, message: '请输入定向流量数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入定向流量数" />
        </el-form-item>
        <el-form-item 
          label="通话分钟数："
          prop="tonghuashu"
          :rules="[
            { required: true, message: '请输入通话分钟数', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入通话分钟数" />
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
  const emit = defineEmits(['update:visible'])
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

  // 关闭弹窗，重置数据
  const handleClose = () => {
    emit('update:visible', false)
  }

  // 完成
  const submit = () => {
    emit('update:visible', false)
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