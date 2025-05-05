<template>
    <div class="container mt-4">
 
      <div class="card">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="title">
            <h2>{{ isEditMode ? 'Edit Task' : 'Create Task' }}</h2>
          </div>
          <div class="action-button">
            <!-- Create Task Button (Positioned to the top-right) -->
            <router-link
              to="/tasks"
              class="btn btn-primary"
            >
               Tasks
            </router-link>
          </div>
        </div>
      
      <form @submit.prevent="submitForm">
        <div class="mb-3">
          <label for="title" class="form-label">Title</label>
          <input
            v-model="form.title"
            type="text"
            class="form-control"
            id="title"
            :class="{'is-invalid': errors.title}"
            placeholder="Enter task title"
          />
          <div v-if="errors.title" class="invalid-feedback">{{ errors.title }}</div>
        </div>
  
        <div class="mb-3">
          <label for="description" class="form-label">Description</label>
          <textarea
            v-model="form.body"
            class="form-control"
            id="description"
            :class="{'is-invalid': errors.body}"
            placeholder="Enter task description"
          ></textarea>
          <div v-if="errors.body" class="invalid-feedback">{{ errors.body }}</div>
        </div>
  
        <button type="submit" class="btn btn-primary">{{ isEditMode ? 'Save Changes' : 'Create Task' }}</button>
      </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '../axios'
  import { useRouter, useRoute } from 'vue-router'
  
  const router = useRouter()
  const route = useRoute()
  
  const isEditMode = ref(false)
  const form = ref({
    title: '',
    body: ''
  })
  const errors = ref({
    title: '',
    body: ''
  })
  
  // Load task for editing
  onMounted(async () => {
    if (route.params.id) {
      isEditMode.value = true
      await fetchTask(route.params.id)
    }
  })
  
  // Fetch task data for editing
  const fetchTask = async (taskId) => {
    try {
      const response = await axios.get(`/api/tasks/${taskId}`)
      form.value.title = response.data.title
      form.value.body = response.data.body
    } catch (err) {
      console.error('Failed to fetch task:', err)
      router.push('/tasks') // Redirect if task not found
    }
  }
  
  // Submit form (create or update task)
  const submitForm = async () => {
    // Clear previous errors
    errors.value = { title: '', description: '' }
  
    if (!form.value.title || !form.value.body) {
      if (!form.value.title) errors.value.title = 'Title is required.'
      if (!form.value.body) errors.value.body = 'Description is required.'
      return
    }
  
    try {
      const data = {
        title: form.value.title,
        body: form.value.body
      }
  
      if (isEditMode.value) {
        await axios.put(`/api/tasks/${route.params.id}`, data)
        router.push('/tasks')
      } else {
        await axios.post('/api/tasks', data)
        router.push('/tasks')
      }
    } catch (err) {
      console.error('Failed to submit task:', err)
      // Handle server-side errors
    }
  }
  </script>
  