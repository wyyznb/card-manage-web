  <template>
    <el-dialog
      class="product-manage"
      :model-value="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      title="添加商品"
      width="700"
      align-center
      @close="handleClose"
    >
      <el-form size="large" :inline="true" ref="perFormRef" :model="perForm">
        <el-form-item 
          label="商品本站id："
          prop="id"
          :rules="[
            { required: true, message: '请输入商品本站id', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.id"  placeholder="请输入商品本站id" />
        </el-form-item>
        <el-form-item 
          label="自有产品名称："
          prop="name"
          :rules="[
            { required: true, message: '请输入自有产品名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.name"  placeholder="请输入自有产品名称" />
        </el-form-item>
        <el-form-item 
          label="申请年龄："
          prop="age"
          :rules="[
            { required: true, message: '请输入年龄', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.age"  placeholder="请输入年龄" />
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
          label="所属平台的商品id："
          prop="productId"
          :rules="[
            { required: true, message: '请输入所属平台的商品id', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productId"  placeholder="请输入所属平台的商品id" />
        </el-form-item>
        <el-form-item 
          label="所属平台的产品名称："
          prop="productName"
          :rules="[
            { required: true, message: '请输入所属平台的产品名称', trigger: 'blur' }
          ]"
        >
          <el-input v-model="perForm.productName"  placeholder="请输入所属平台的产品名称" />
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
    name: '移动'
  },{
    id: 2,
    name: '联通'
  },{
    id: 3,
    name: '电信'
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