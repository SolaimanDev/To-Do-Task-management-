<template>
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="mb-4">Register</h2>
        <div v-if="error" class="alert alert-danger">
          {{ error }}
        </div>
        <form @submit.prevent="register">
          <div class="mb-3">
            <label class="form-label">Name</label>
            <input v-model="form.name" type="text" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Email</label>
            <input v-model="form.email" type="email" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Password</label>
            <input v-model="form.password" type="password" class="form-control" required />
          </div>
  
          <div class="mb-3">
            <label class="form-label">Confirm Password</label>
            <input v-model="form.password_confirmation" type="password" class="form-control" required />
          </div>
  
          <button type="submit" class="btn btn-primary w-100" :disabled="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  import { useAuthStore } from '../stores/authStore' // Pinia store import
  
  const router = useRouter()
  const authStore = useAuthStore() // Accessing auth store
  
  const form = ref({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  })
  
  const loading = ref(false)
  const error = ref('')
  
  const register = async () => {
    loading.value = true
    error.value = ''
  
    try {
      await axios.get('/sanctum/csrf-cookie') // Sanctum needs this first
  
      const res = await axios.post('/api/auth/register', form.value)
      const token = res.data.token
  
      // Update auth state
      authStore.login(res.data.user)
  
      // Save token to localStorage and set it in axios headers
      localStorage.setItem('auth_token', token)
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
  
      // Redirect to dashboard after successful registration
      router.push('/dashboard')
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        error.value = err.response.data.message
      } else {
        error.value = 'Registration failed.'
      }
    } finally {
      loading.value = false
    }
  }
  </script>
  
  <style scoped></style>
  