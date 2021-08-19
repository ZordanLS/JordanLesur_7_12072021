import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
 {
    path: '/login',
    name: 'Login',
    component: () => import('../components/Login.vue')
  },
  {
    path: '/signup',
    name: 'Signup',
    component: () => import('../components/Signup.vue')
  }

]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
