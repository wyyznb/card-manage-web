
<template>
  <div class="left-menu">
    <el-menu
      :default-active="isActive"
      active-text-color="#ffd04b"
      background-color="#545c64"
      text-color="#fff"
    >
      <template
        v-for="item in leftMenuData"
        :key="item.id"
      >
        <el-sub-menu v-if="item.children?.length">
          <template #title>
            <el-icon :size="20">
              <component :is="item.icon" />
            </el-icon>
            <span>{{ item.label }}</span>
          </template>
          <el-menu-item-group>
            <el-menu-item
              v-for="obj in item.children"
              :key="obj.id"
              :index="obj.id"
              @click="queryLink(obj.path)"
            >
              <el-icon :size="20">
                <component :is="obj.icon" />
              </el-icon>
              <span>{{ obj.label }}</span>
            </el-menu-item>
          </el-menu-item-group>
        </el-sub-menu>
        <el-menu-item :index="item.id" @click="queryLink(item.path)" v-else>
          <el-icon :size="20">
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.label }}</span>
        </el-menu-item>
      </template>
    </el-menu>
  </div>
</template>
<script setup lang="ts">
import leftMenuData from '@/config/leftMenuData'

const isActive:any = ref('1')
const router = useRouter()
const route = useRoute()

const queryLink = (path: any) => {
  router.push({
    path
  })
}

const queryId = () => {
  leftMenuData.forEach((item: any) => {
    if (item.children?.length) {
      item.children.forEach((obj: any) => {
        if (obj.path === route.path) {
          isActive.value = obj.id
        }
      })
    } else {
      if (item.path === route.path) {
        isActive.value = item.id
      }
    }
  })
}

watchEffect(() => {
  queryId()
})

</script>
<style scoped lang="scss">
.left-menu{
  .el-menu{
    border-right: none;
    :deep(.el-menu-item-group__title){
      display: none;
    }
  }
}
</style>
