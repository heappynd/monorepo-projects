<script setup lang="ts">
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage } from 'element-plus'
import { onMounted, reactive, ref } from 'vue'
import { useAuthStore } from '@/stores/auth'
import api from '@/utils/api'

const authStore = useAuthStore()
const formRef = ref<FormInstance>()
const loading = ref(false)
const editing = ref(false)

const form = reactive({
  nickname: '',
  email: '',
})

const rules = reactive<FormRules>({
  nickname: [
    { required: true, message: '请输入昵称', trigger: 'blur' },
  ],
  email: [
    { required: true, message: '请输入邮箱', trigger: 'blur' },
    { type: 'email', message: '请输入正确的邮箱格式', trigger: 'blur' },
  ],
})

onMounted(async () => {
  try {
    await authStore.fetchUser()
    if (authStore.user) {
      form.nickname = authStore.user.nickname
      form.email = authStore.user.email
    }
  }
  catch {
    ElMessage.error('获取用户信息失败')
  }
})

function startEdit() {
  editing.value = true
}

function cancelEdit() {
  editing.value = false
  if (authStore.user) {
    form.nickname = authStore.user.nickname
    form.email = authStore.user.email
  }
}

async function handleSave() {
  if (!formRef.value)
    return

  await formRef.value.validate(async (valid) => {
    if (!valid)
      return

    loading.value = true
    try {
      await api.patch('/users/me', {
        nickname: form.nickname,
        email: form.email,
      })
      await authStore.fetchUser()
      ElMessage.success('更新成功')
      editing.value = false
    }
    catch {
      ElMessage.error('更新失败')
    }
    finally {
      loading.value = false
    }
  })
}
</script>

<template>
  <div class="profile-container">
    <el-card class="profile-card">
      <template #header>
        <div class="card-header">
          <h2>个人中心</h2>
          <el-button
            v-if="!editing"
            type="primary"
            @click="startEdit"
          >
            编辑
          </el-button>
        </div>
      </template>

      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        label-width="80px"
        :disabled="!editing"
      >
        <el-form-item label="用户名">
          <el-input :value="authStore.user?.username" disabled />
        </el-form-item>

        <el-form-item label="昵称" prop="nickname">
          <el-input v-model="form.nickname" placeholder="请输入昵称" />
        </el-form-item>

        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" placeholder="请输入邮箱" />
        </el-form-item>

        <el-form-item v-if="editing">
          <el-button type="primary" :loading="loading" @click="handleSave">
            保存
          </el-button>
          <el-button @click="cancelEdit">
            取消
          </el-button>
        </el-form-item>
      </el-form>

      <div class="actions">
        <el-button type="warning" @click="$router.push('/change-password')">
          修改密码
        </el-button>
      </div>
    </el-card>
  </div>
</template>

<style scoped>
.profile-container {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
}

.profile-card {
  width: 500px;
}

.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.card-header h2 {
  margin: 0;
  color: #303133;
}

.actions {
  margin-top: 20px;
  text-align: center;
}
</style>
