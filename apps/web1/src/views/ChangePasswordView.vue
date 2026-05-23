<script setup lang="ts">
import { showToast } from 'vant'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const router = useRouter()
const loading = ref(false)

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

async function handleSubmit() {
  if (!form.oldPassword || !form.newPassword || !form.confirmPassword) {
    showToast('请填写所有字段')
    return
  }

  if (form.newPassword !== form.confirmPassword) {
    showToast('两次输入的密码不一致')
    return
  }

  if (form.newPassword.length < 6) {
    showToast('新密码长度不能少于6位')
    return
  }

  loading.value = true
  try {
    await api.patch('/users/me/password', {
      oldPassword: form.oldPassword,
      newPassword: form.newPassword,
    })
    showToast('密码修改成功')
    router.back()
  }
  catch (error: unknown) {
    const message = error instanceof Error ? error.message : '密码修改失败'
    showToast(message)
  }
  finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="change-password-page">
    <van-nav-bar
      title="修改密码"
      left-arrow
      @click-left="router.back()"
    />

    <van-form @submit="handleSubmit">
      <van-cell-group inset>
        <van-field
          v-model="form.oldPassword"
          type="password"
          name="oldPassword"
          label="原密码"
          placeholder="请输入原密码"
          :rules="[{ required: true, message: '请输入原密码' }]"
        />
        <van-field
          v-model="form.newPassword"
          type="password"
          name="newPassword"
          label="新密码"
          placeholder="请输入新密码"
          :rules="[{ required: true, message: '请输入新密码' }]"
        />
        <van-field
          v-model="form.confirmPassword"
          type="password"
          name="confirmPassword"
          label="确认密码"
          placeholder="请再次输入新密码"
          :rules="[{ required: true, message: '请确认新密码' }]"
        />
      </van-cell-group>

      <div class="submit-button">
        <van-button
          round
          block
          type="primary"
          native-type="submit"
          :loading="loading"
        >
          确认修改
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<style scoped>
.change-password-page {
  min-height: 100vh;
  background-color: #f7f8fa;
}

.submit-button {
  margin: 24px 16px;
}
</style>
