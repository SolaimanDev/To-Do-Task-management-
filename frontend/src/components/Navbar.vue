<template>
    <div>
      <!-- Navbar -->
      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container">
          <router-link class="navbar-brand" to="/">To-Do App</router-link>
          <div>
            <ul class="navbar-nav me-auto mb-2 mb-lg-0">
              <li class="nav-item" v-if="!authenticated">
                <router-link class="nav-link" to="/">Home</router-link>
              </li>
              <li class="nav-item" v-if="authenticated">
                <router-link class="nav-link" to="/dashboard">Dashboard</router-link>
              </li>
              <li class="nav-item" v-if="!authenticated">
                <router-link class="nav-link" to="/login">Login</router-link>
              </li>
              <li class="nav-item" v-if="!authenticated">
                <router-link class="nav-link" to="/register">Register</router-link>
              </li>
              <li class="nav-item" v-if="authenticated">
                <router-link class="nav-link" to="/tasks">Tasks</router-link>
              </li>
              <li class="nav-item" v-if="authenticated">
                <a class="nav-link" href="#" @click.prevent="logout">Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  </template>
  
  <script setup>
  import { useAuthStore } from '../stores/authStore'
  import { watch , computed} from 'vue'
  import { useRouter } from 'vue-router'
  
  const authStore = useAuthStore()
  const router = useRouter()
  
  // Watch the authenticated state to trigger changes
  const authenticated = computed(() => authStore.isAuthenticated)
  
  const logout = () => {
    authStore.logout() // Reset authentication state
    localStorage.removeItem('auth_token') // Optionally, clear token
    router.push('/login') // Redirect to login page
  }
  </script>
  
  <style scoped>
  /* Optional styles */
  </style>
  