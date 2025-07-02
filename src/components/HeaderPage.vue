
<template>
  <div class="header-part">
    <div class="card-title">
      <el-icon :size="24">
        <Monitor />
      </el-icon>
      流量卡管理系统
    </div>
    <div class="logout" @click="handleLogout">退出登录</div>
  </div>
</template>
<script setup lang="ts">
const router = useRouter()

const handleLogout = () => {
  localStorage.removeItem('token')
  router.push({
    path: '/login'
  })
}
</script>
<style scoped lang="scss">
.header-part{
  width: 100%;
  position: sticky;
  top: 0;
  padding-right: 20px;
  display: flex;
  box-sizing: border-box;
  box-shadow: 0 0 5px rgba(3, 13, 40, 0.1);
  display: flex;
  .card-title{
    padding-left: 20px;
    background-color: #324ed1;
    width: 240px;
    display: flex;
    align-items: center;
    font-size: 16px;
    font-weight: 500;
    box-sizing: border-box;
    color: #fff;
    .el-icon{
      margin-right: 5px;
    }
  }
  .logout{
    font-size: 14px;
    color: #606266;
    margin-left: auto;
    display: flex;
    align-items: center;
    transition: all 0.3s ease-in-out;
    cursor: pointer;
    &:hover{
      color: #324ed1;
    }
  }
}
</style>
