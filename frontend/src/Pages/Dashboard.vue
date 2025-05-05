<template>
     <h1>Dashboard (Protected)</h1>
     <p>Only visible when authenticated.</p>
</template>

<script setup>
import { onMounted } from 'vue'
import axios from '../axios'
import { useRouter } from 'vue-router'

const router = useRouter()

onMounted(async () => {
  try {
    await axios.get('/api/user')
  } catch {
    router.push('/login')
  }
})
</script>
<style>

</style>