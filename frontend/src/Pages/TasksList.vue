<template>
    <div class="container mt-4 position-relative">

  

  
      <!-- Display Tasks in a Card -->
      <div class="card">
        <div class="card-body">
            <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="title">
            <h2>Task List</h2>
          </div>
          <div class="action-button">
            <!-- Create Task Button (Positioned to the top-right) -->
            <router-link
          to="/tasks-create"
          class="btn btn-primary mb-3"
        >
          Create Task
        </router-link>
          </div>
        </div>
              <!-- Display tasks -->
      <div v-if="tasks.length === 0" class="alert alert-info">
        No tasks available.
      </div>
          <ul v-else class="list-group">
            <li v-for="task in tasks" :key="task.id" class="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <input
                  type="checkbox"
                  v-model="task.is_completed"
                  @change="toggleCompletion(task)"
                  class="form-check-input me-2"
                  :checked="task.is_completed"
                />
                <span :class="{'text-decoration-line-through': task.is_completed}">{{ task.title }}</span>
              </div>
              <div>
                <!-- Edit Button -->
                <router-link :to="{ name: 'task-edit', params: { id: task.id } }" class="btn btn-info btn-sm mr-2">
                  Edit
                </router-link>
                <!-- Delete Button with Confirmation -->
                <button @click="confirmDelete(task.id)" class="btn btn-danger btn-sm">
                  Delete
                </button>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue'
  import axios from '../axios'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const tasks = ref([])
  
  // Fetch tasks when component is mounted
  onMounted(async () => {
    await fetchTasks()
  })
  
  // Fetch tasks from the backend
  const fetchTasks = async () => {
    try {
      const response = await axios.get('/api/tasks')
      tasks.value = response.data
    } catch (err) {
      console.error('Error fetching tasks:', err)
    }
  }
  
  // Handle task deletion after confirmation
  const confirmDelete = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?')
    if (confirmed) {
      deleteTask(taskId)
    }
  }
  
  // Delete a task
  const deleteTask = async (taskId) => {
    try {
      await axios.delete(`/api/tasks/${taskId}`)
      tasks.value = tasks.value.filter(task => task.id !== taskId)
    } catch (err) {
      console.error('Error deleting task:', err)
    }
  }
  
  // Toggle task completion
  const toggleCompletion = async (task) => {
    axios.patch(`/api/tasks/${task.id}/complete`)
      .then(response => {
        task.is_completed = response.data.is_completed
      })
      .catch(error => {
        console.error("There was an error toggling task completion: ", error.response)
      })
  }
  </script>
  
  <style scoped>
  .text-decoration-line-through {
    text-decoration: line-through;
  }
  
  .card {
    margin-top: 20px;
  }
  </style>
  