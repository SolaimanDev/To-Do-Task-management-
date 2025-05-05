import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import axios from './axios'
import { useAuthStore } from './stores/authStore'

// Import Bootstrap CSS and BootstrapVueNext CSS
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue-next/dist/bootstrap-vue-next.css'

import * as BootstrapVueNext from 'bootstrap-vue-next'

// Initialize Pinia
const pinia = createPinia()
const app = createApp(App)

// Set up global properties and plugins
app.config.globalProperties.$axios = axios
app.use(BootstrapVueNext)
app.use(router)
app.use(pinia)

// Initialize auth store and check authentication before mounting
const authStore = useAuthStore()
authStore.checkAuth()

// Mount the app
app.mount('#app')
