import { createRouter, createWebHistory } from 'vue-router'

import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: HomeView
    },
    {
      path: '/login',
      name: 'Login',
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('../views/RegisterView.vue')
    },
    // {
    //   path: '/profile',
    //   name: 'Profile',
    //   component: () => import('../views/ProfileView.vue')
    // },
    // {
    //   path: '/about',
    //   name: 'About',
    //   component: () => import('../views/AboutView.vue')
    // },
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('../views/NotFoundView.vue')
    // }
  ]
})

export default router
