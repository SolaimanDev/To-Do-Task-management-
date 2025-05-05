import axios from 'axios'

// Set the base URL of your Laravel backend
axios.defaults.baseURL = 'http://127.0.0.1:8000' // or your production backend URL

// Allow Axios to send cookies (needed for Sanctum)
axios.defaults.withCredentials = true

// Optional: Set common headers
axios.defaults.headers.common['Accept'] = 'application/json'
const token = localStorage.getItem('auth_token')
if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
}

export default axios
