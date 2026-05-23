<script setup lang="ts">
import { showConfirmDialog, showToast } from 'vant'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'

const router = useRouter()
const authStore = useAuthStore()
const loading = ref(false)

const form = ref({
  nickname: '',
  email: '',
})

onMounted(async () => {
  try {
    const user = await authStore.fetchUser()
    form.value.nickname = user.nickname || ''
    form.value.email = user.email || ''
  }
  catch {
    showToast('获取用户信息失败')
  }
})

async function handleSave() {
  loading.value = true
  try {
    await api.patch('/users/me', {
      nickname: form.value.nickname,
      email: form.value.email,
    })
    showToast('保存成功')
    await authStore.fetchUser()
  }
  catch {
    showToast('保存失败')
  }
  finally {
    loading.value = false
  }
}

function handleChangePassword() {
  router.push('/change-password')
}

async function handleLogout() {
  try {
    await showConfirmDialog({
      title: '提示',
      message: '确定要退出登录吗？',
    })
    authStore.logout()
    router.push('/login')
  }
  catch {
    // User cancelled
  }
}
</script>

<template>
  <div class="profile-page">
    <van-nav-bar title="个人中心" />

    <van-cell-group inset class="user-info">
      <van-cell title="用户名" :value="authStore.user?.username" />
      <van-cell title="ID" :value="authStore.user?.id" />
    </van-cell-group>

    <van-cell-group inset class="edit-form">
      <van-field
        v-model="form.nickname"
        label="昵称"
        placeholder="请输入昵称"
      />
      <van-field
        v-model="form.email"
        label="邮箱"
        placeholder="请输入邮箱"
      />
    </van-cell-group>

    <div class="action-buttons">
      <van-button
        round
        block
        type="primary"
        :loading="loading"
        @click="handleSave"
      >
        保存修改
      </van-button>

      <van-button
        round
        block
        plain
        type="primary"
        @click="handleChangePassword"
      >
        修改密码
      </van-button>

      <van-button
        round
        block
        plain
        type="danger"
        @click="handleLogout"
      >
        退出登录
      </van-button>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.user-info {
  margin-top: 12px;
}

.edit-form {
  margin-top: 12px;
}

.action-buttons {
  margin: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 12px;
}
</style>
