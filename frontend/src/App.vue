<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
    <!-- Page content -->
<div>
  <Navbar/>
  <div class="container mt-4">
      <router-view />
    </div>
</div>
</template>


