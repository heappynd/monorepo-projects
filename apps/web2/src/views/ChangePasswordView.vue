<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/utils/api'

const router = useRouter()
const formRef = ref<FormInstance>()
const loading = ref(false)

const form = reactive({
  oldPassword: '',
  newPassword: '',
  confirmPassword: '',
})

function validateConfirmPassword(_rule: unknown, value: string, callback: (error?: Error) => void) {
  if (value !== form.newPassword) {
    callback(new Error('两次输入的密码不一致'))
  }
  else {
    callback()
  }
}

const rules = reactive<FormRules>({
  oldPassword: [
    { required: true, message: '请输入旧密码', trigger: 'blur' },
  ],
  newPassword: [
    { required: true, message: '请输入新密码', trigger: 'blur' },
    { min: 6, message: '密码长度不能少于6位', trigger: 'blur' },
  ],
  confirmPassword: [
    { required: true, message: '请确认新密码', trigger: 'blur' },
    { validator: validateConfirmPassword, trigger: 'blur' },
  ],
})

async function handleChangePassword() {
  if (!formRef.value)
    return

  await formRef.value.validate(async (valid) => {
    if (!valid)
      return

    loading.value = true
    try {
      await api.patch('/users/me/password', {
        oldPassword: form.oldPassword,
        newPassword: form.newPassword,
      })
      ElMessage.success('密码修改成功，请重新登录')
      localStorage.removeItem('token')
      router.push('/login')
    }
    catch (error: unknown) {
      const message = error instanceof Error ? error.message : '密码修改失败'
      ElMessage.error(message)
    }
    finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="change-password-container">
    <el-card class="change-password-card">
      <template #header>
        <h2>修改密码</h2>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="100px"
        @submit.prevent="handleChangePassword"
      >
        <el-form-item label="旧密码" prop="oldPassword">
          <el-input
            v-model="form.oldPassword"
            type="password"
            placeholder="请输入旧密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="新密码" prop="newPassword">
          <el-input
            v-model="form.newPassword"
            type="password"
            placeholder="请输入新密码"
            show-password
          />
        </el-form-item>

        <el-form-item label="确认新密码" prop="confirmPassword">
          <el-input
            v-model="form.confirmPassword"
            type="password"
            placeholder="请再次输入新密码"
            show-password
          />
        </el-form-item>

        <el-form-item>
          <el-button type="primary" :loading="loading" @click="handleChangePassword">
            修改密码
          </el-button>
          <el-button @click="router.back()">
            返回
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<style scoped>
.change-password-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.change-password-card {
  width: 500px;
}

.change-password-card h2 {
  text-align: center;
  margin: 0;
  color: #303133;
}
</style>
