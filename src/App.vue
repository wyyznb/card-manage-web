<template>
  <div class="card-part">
    <el-container>
      <el-header v-if="$route.meta.requireAuth">
        <headerPage />
      </el-header>
      <el-container>
        <el-aside width="240px" v-if="$route.meta.requireAuth">
          <leftMenu />
        </el-aside>
        <el-main :class="{'h-main': !$route.meta.requireAuth}">
          <el-config-provider :locale="zhCn">
            <router-view v-slot="{ Component }">
              <keep-alive>
                <component :is="Component" :key="$route.fullPath" v-if="$route.meta.keepAlive" />
              </keep-alive>
              <component :is="Component" :key="$route.fullPath" v-if="!$route.meta.keepAlive" />
            </router-view>
          </el-config-provider>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <!-- <RouterView /> -->
</template>
<script setup lang="ts">
import zhCn from 'element-plus/es/locale/lang/zh-cn'
</script>
<style scoped lang="scss">
.card-part{
  display: flex;
  .el-header{
    display: flex;
    padding: 0;
  }
  .el-aside{
    height: calc(100vh - 60px);
    background-color: #545c64;
  }
  .el-main{
    height: calc(100vh - 60px);
    box-sizing: border-box;
    min-width: 1024px;
    background: #f6f8fa;
    &.h-main{
      height: 100vh;
    }
  }
}
</style>
