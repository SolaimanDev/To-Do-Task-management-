import { createWebHistory, createRouter } from 'vue-router'

import Home from './../Pages/Home.vue'
import Dashboard from './../Pages/Dashboard.vue'
import Login from './../Pages/Login.vue'
import Register from './../Pages/Register.vue'
import TaskList from './../Pages/TasksList.vue'
import TaskCreate from './../Pages/TaskCreate.vue'
import TaskEdit from './../Pages/TaskEdit.vue'


const routes = [
  { path: '/', component: Home },
  { path: '/dashboard', component: Dashboard },
  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/tasks', component: TaskList },
  { path: '/tasks-create', component: TaskCreate },
  { path: '/tasks-edit/:id', component: TaskEdit, name: 'task-edit' },
]

 const router = createRouter({
 history: createWebHistory(),
  routes,
});

export default router