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
    {
      path: '/profile',
      name: 'Profile',
      component: () => import('../views/ProfileView.vue'),
      children: [
        {
          path: '',
          redirect:'profile/account'
        },
        {
          path: 'account',
          component: import('../components/Profile/Personal-information.vue')
        },
        {
          path: 'changePassword',
          component: import('../components/Profile/SettingMyAccount.vue')
        }
        // Agrega aquí las rutas para los otros elementos de la lista
      ]
    }
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
