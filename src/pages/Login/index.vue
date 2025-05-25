<template>
  <div class="login-container">
    <div class="login">
      <h2>登录</h2>
      <div class="form-main">
        <el-form size="large" :inline="true" ref="loginFormRef" :model="loginForm">
          <el-form-item 
            label="用户名："
            prop="userName"
            :rules="[
              { required: true, message: '请输入用户名', trigger: 'blur' }
            ]"
          >
            <el-input v-model="loginForm.userName" placeholder="请输入用户名" />
          </el-form-item>
          <el-form-item 
            label="密码："
            prop="userPassWord"
            type="password"
            :rules="[
              { required: true, message: '请输入密码', trigger: 'blur' }
            ]"
          >
            <el-input v-model="loginForm.userPassWord" placeholder="请输入密码" />
          </el-form-item>
        </el-form>
        <div class="login-submit" @click="handleSubmit(loginFormRef)">
          <el-button type="primary" size="large">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { FormInstance } from 'element-plus'

const loginFormRef = ref()
const loginForm: any = reactive({
  userName: '',
  userPassWord: ''
})
const router = useRouter()

// 登录
const handleSubmit = (formEl: FormInstance | undefined) => {
  if(!formEl) return
  formEl.validate((valid: any) => {
    if (valid) {
      router.push({
        path: '/home'
      })
    }
  })
}
</script>
<style lang="scss" scoped>
.login-container{
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  .login{
    width: 500px;
    border-radius: 5px;
    background-color: #fff;
    box-shadow: 0 0 5px rgba(3, 13, 40, 0.1);
    &>h2{
      font-size: 16px;
      color: #333;
      padding: 0 30px;
      line-height: 50px;
      border-bottom: 1px rgba(0, 0, 0, 0.1) solid;
    }
    .form-main{
      width: 100%;
      padding: 30px;
      box-sizing: border-box;
      :deep(.el-form-item){
        width: 100%;
        margin-bottom: 25px;
        .el-form-item__label{
          width: 80px;
          text-align: right;
        }
      }
    }
    .login-submit{
      width: 100%;
      display: flex;
      .el-button{
        flex: 1;
      }
    }
  }
}
</style>