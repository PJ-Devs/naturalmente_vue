import { createRouter, createWebHistory } from 'vue-router'
import { useAuthUserStore } from '../stores/authUser'
import type { NavigationGuardNext, RouteLocationNormalized } from 'vue-router'

import HomeView from '../views/HomeView.vue'
import ProductsView from '../views/ProductsView.vue'

export function requireUnAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  const authUserStore = useAuthUserStore();
  if (authUserStore.isLoggedIn.value) {
    next({ name: 'Home' });
  } else {
    next();
  }
}

export function requireAuth(to: RouteLocationNormalized, from: RouteLocationNormalized, next: NavigationGuardNext): void {
  const authUserStore = useAuthUserStore();
  if (!authUserStore.isLoggedIn.value) {
    next({ name: 'Login' });
  } else {
    next();
  }
}

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
      beforeEnter: requireUnAuth,
      component: () => import('../views/LoginView.vue')
    },
    {
      path: '/register',
      name: 'Register',
      beforeEnter: requireUnAuth,
      component: () => import('../views/RegisterView.vue')
    },
    {
      path: '/carrito',
      name: 'Carrito',
      beforeEnter: requireAuth,
      component: () => import('../views/ShoppingCartView.vue')
    },
    {
      path: '/productos',
      name: 'Productos',
      component: ProductsView
    },
    {
      path: '/productos/:id',
      name: 'ProductDetails',
      component: () => import('../components/Products/ProductDetails.vue')
    },
    {
      path: '/profile',
      name: 'Profile',
      beforeEnter: requireAuth,
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
      ]
    }
    // {
    //   path: '/:pathMatch(.*)*',
    //   name: 'NotFound',
    //   component: () => import('../views/NotFoundView.vue')
    // }
  ]
})

export default router
