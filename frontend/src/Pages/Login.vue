<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4">Login</h2>
  
        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>
  
        <form @submit.prevent="login">
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" required />
          </div>
  
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from '../axios'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/authStore'
  const router = useRouter()
  const authStore = useAuthStore()
  const form = ref({
    email: '',
    password: ''
  })
  
  const loading = ref(false)
  const error = ref('')
  
  const login = async () => {
    loading.value = true
    error.value = ''
  
    try {
      await axios.get('/sanctum/csrf-cookie') // Needed before login
  
      const res =  await axios.post('/api/auth/login', form.value)
      // Get the token from response
        const token = res.data.token
        authStore.login(res.data.user) // Update auth state
        // Save to localStorage
        localStorage.setItem('auth_token', token)
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
      router.push('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        error.value = err.response.data.message
      } else {
        error.value = 'Login failed.'
      }
    } finally {
      loading.value = false
    }
  }
  </script>
  