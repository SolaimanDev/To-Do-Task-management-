// stores/authStore.js
import { defineStore } from 'pinia'
import axios from './../axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    isAuthenticated: false,
    user: null,
  }),
  actions: {
    login(userData) {
      this.isAuthenticated = true
      this.user = userData
    },
    logout() {
      this.isAuthenticated = false
      this.user = null
    },
    checkAuth() {
      const token = localStorage.getItem('auth_token')
      if (token) {
        this.isAuthenticated = true
        // Optionally, get the user from API or localStorage
        // You can use an API call to fetch the user data if needed
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      }
    }
  },
})
