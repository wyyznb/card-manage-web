  <template>
    <el-dialog
      class="plat-manage"
      :model-value="visible"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :destroy-on-close="true"
      title="添加平台"
      width="500"
      align-center
      @close="handleClose"
    >
       <el-form size="large" :inline="true" ref="perFormRef" :model="perForm">
          <el-form-item 
            label="平台名称："
            prop="title"
            :rules="[
              { required: true, message: '请输入平台名称', trigger: 'blur' }
            ]"
          >
            <el-input v-model="perForm.title"  placeholder="请输入平台名称" />
          </el-form-item>
        </el-form>
        <template #footer>
          <div>
            <el-button @click="handleClose">取消</el-button>
            <el-button type="primary" @click="addPlatform">完成</el-button>
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
  const perFormRef = ref<any>()

  // 关闭弹窗，重置数据
  const handleClose = () => {
    emit('update:visible', false)
    perFormRef.value.resetFields()
  }

  // 添加平台
  const addPlatform = async () => {
    try {
      const { code, msg } = await apis.platformSaveApi({
        id: 0,
        title: props.perForm.title
      })
      if (!code) {
        myMessage({message: msg, type:'success'})
        handleClose()
        emit('confirmUser')
      }
    } catch (error: any) {
      throw new Error(error)
    }
  }

  </script>
  <style scoped lang="scss">
 .plat-manage{
    .el-form-item{
      width:100%;
      margin: 10px 0;
    }
  }

  </style>