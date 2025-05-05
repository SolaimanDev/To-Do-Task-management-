<template>
    <div class="container mt-4">
        <div class="card">
            <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
          <div class="title">
            <h2>Edit Task </h2>
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
      <div v-if="task" class="p-3">
        <form @submit.prevent="updateTask">
          <div class="mb-3">
            <label for="title" class="form-label">Title</label>
            <input
              type="text"
              class="form-control"
              id="title"
              v-model="task.title"
              required
            />
          </div>
          <div class="mb-3">
            <label for="body" class="form-label">Body</label>
            <textarea
              class="form-control"
              id="body"
              v-model="task.body"
              rows="4"
              required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary">Update Task</button>
        </form>
      </div>
      <div v-else>
        <p>Task not found!</p>
      </div>
    </div>
  </div>
  </div>
  </template>
  
  <script>
  import axios from './../axios'
  export default {
    data() {
      return {
        task: null,
      };
    },
    methods: {
      // Fetch task details to populate the form
      fetchTask() {
        const taskId = this.$route.params.id;
        axios.get(`/api/tasks/${taskId}`)
          .then((response) => {
            this.task = response.data;
          })
          .catch((error) => {
            console.error("There was an error fetching the task: ", error);
          });
      },
  
      // Handle task update
      updateTask() {
        const taskId = this.$route.params.id;
        axios.put(`/api/tasks/${taskId}`, {
          title: this.task.title,
          body: this.task.body,
        })
          .then((response) => {
            this.$router.push('/tasks');  // Redirect to task list page
          })
          .catch((error) => {
            console.error("There was an error updating the task: ", error);
          });
      },
    },
    mounted() {
      this.fetchTask();
    },
  };
  </script>
  