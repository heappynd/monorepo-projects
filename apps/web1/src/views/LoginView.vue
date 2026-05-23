<script setup lang="ts">
import { showToast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = reactive({
  username: '',
  password: '',
})

async function handleLogin() {
  if (!form.username || !form.password) {
    showToast('请输入用户名和密码')
    return
  }

  loading.value = true
  try {
    await authStore.login(form.username, form.password)
    await authStore.fetchUser()
    showToast('登录成功')
    router.push('/profile')
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : '登录失败，请检查用户名和密码'
    showToast(message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-header">
      <h1>用户登录</h1>
    </div>

    <van-form @submit="handleLogin">
      <van-cell-group inset>
        <van-field
          v-model="form.username"
          name="username"
          label="用户名"
          placeholder="请输入用户名"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
        <van-field
          v-model="form.password"
          type="password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ required: true, message: '请输入密码' }]"
        />
      </van-cell-group>

      <div class="login-button">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="loading"
        >
          登录
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.login-header {
  padding: 60px 0 40px;
  text-align: center;
}

.login-header h1 {
  margin: 0;
  font-size: 24px;
  color: #323233;
}

.login-button {
  margin: 24px 16px;
}
</style>
