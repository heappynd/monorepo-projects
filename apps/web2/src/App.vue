<script setup lang="ts">
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useAuthStore } from '@/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

function handleLogout() {
  authStore.logout()
  router.push('/login')
}
</script>

<template>
  <el-container>
    <el-header>
      <nav class="nav-menu">
        <RouterLink to="/">
          首页
        </RouterLink>
        <RouterLink to="/about">
          关于
        </RouterLink>
        <template v-if="authStore.token">
          <RouterLink to="/profile">
            个人中心
          </RouterLink>
          <el-button type="text" @click="handleLogout">
            退出登录
          </el-button>
        </template>
        <RouterLink v-else to="/login">
          登录
        </RouterLink>
      </nav>
    </el-header>

    <el-main>
      <RouterView />
    </el-main>
  </el-container>
</template>

<style scoped>
.el-header {
  background-color: #409eff;
  display: flex;
  align-items: center;
  padding: 0 20px;
}

.nav-menu {
  display: flex;
  align-items: center;
  gap: 20px;
}

.nav-menu a {
  color: #fff;
  text-decoration: none;
  font-size: 14px;
}

.nav-menu a:hover {
  color: #ecf5ff;
}

.nav-menu a.router-link-exact-active {
  color: #ffd04b;
}

.nav-menu .el-button {
  color: #fff;
}

.nav-menu .el-button:hover {
  color: #ffd04b;
}

.el-main {
  min-height: calc(100vh - 60px);
}
</style>
