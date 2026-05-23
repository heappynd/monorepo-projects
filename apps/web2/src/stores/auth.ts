import { defineStore } from 'pinia'
import { ref } from 'vue'
import api from '@/utils/api'

interface User {
  id: number
  username: string
  nickname: string
  email: string
}

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(localStorage.getItem('token'))
  const user = ref<User | null>(null)

  async function login(username: string, password: string) {
    const response = await api.post('/auth/login', { username, password })
    const { access_token } = response.data
    token.value = access_token
    localStorage.setItem('token', access_token)
    return response.data
  }

  async function fetchUser() {
    try {
      const response = await api.get('/users/me')
      user.value = response.data
      return response.data
    }
    catch {
      user.value = null
      throw new Error('Failed to fetch user')
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('token')
  }

  return { token, user, login, fetchUser, logout }
})
